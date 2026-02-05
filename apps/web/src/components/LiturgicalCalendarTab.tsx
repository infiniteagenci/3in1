import { useState, useEffect, useMemo } from 'react';

// Types for Liturgical Calendar
interface LiturgicalDay {
  date: Date;
  season: LiturgicalSeason;
  color: LiturgicalColor;
  celebration?: Celebration;
  isSunday: boolean;
  psalterWeek?: number; // Week I, II, III, or IV
  dailyReadings?: DailyReadings;
  weekOfOrdinaryTime?: number; // Week number in Ordinary Time
}

interface DailyReadings {
  firstReading?: { citation: string; book?: string };
  responsorialPsalm?: { citation: string };
  secondReading?: { citation: string; book?: string };
  gospel?: { citation: string; book?: string };
  gospelAcclamation?: string;
}

type LiturgicalSeason =
  | 'advent'
  | 'christmas'
  | 'ordinary_time_winter'
  | 'lent'
  | 'easter'
  | 'ordinary_time_summer_fall'
  | 'advent_christmas'; // For overlap period

type LiturgicalColor = 'green' | 'purple' | 'white' | 'red' | 'rose' | 'violet' | 'gold';

type CelebrationRank =
  | 'solemnity'
  | 'feast'
  | 'memorial'
  | 'memorial_optional'
  | 'commemoration'
  | 'ferial';

interface Celebration {
  name: string;
  rank: CelebrationRank;
  color?: LiturgicalColor;
  description?: string;
}

// Liturgical Calendar Utilities
class LiturgicalCalendar {
  /**
   * Calculate Easter Sunday for a given year
   * Uses the Anonymous Gregorian algorithm
   */
  static getEasterDate(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);

    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
  }

  /**
   * Get Ash Wednesday (46 days before Easter)
   */
  static getAshWednesday(year: number): Date {
    const easter = this.getEasterDate(year);
    return new Date(easter.getTime() - 46 * 24 * 60 * 60 * 1000);
  }

  /**
   * Get Pentecost (49 days after Easter)
   */
  static getPentecost(year: number): Date {
    const easter = this.getEasterDate(year);
    return new Date(easter.getTime() + 49 * 24 * 60 * 60 * 1000);
  }

  /**
   * Get First Sunday of Advent
   */
  static getFirstSundayOfAdvent(year: number): Date {
    const christmas = new Date(year, 11, 25); // December 25
    const dayOfWeek = christmas.getDay(); // 0 = Sunday
    const daysUntilSunday = (7 - (dayOfWeek === 0 ? 7 : dayOfWeek)) % 7;
    // First Sunday of Advent is the Sunday closest to Dec 3 (4 Sundays before Christmas)
    const dec3 = new Date(year, 11, 3);
    const dec3DayOfWeek = dec3.getDay();
    const daysBack = dec3DayOfWeek === 0 ? 0 : dec3DayOfWeek;
    return new Date(year, 11, 3 - daysBack);
  }

  /**
   * Determine the liturgical season for a given date
   */
  static getSeason(date: Date): LiturgicalSeason {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const easter = this.getEasterDate(year);
    const ashWednesday = this.getAshWednesday(year);
    const pentecost = this.getPentecost(year);
    const firstSundayOfAdvent = this.getFirstSundayOfAdvent(year);
    const firstSundayOfAdventNext = this.getFirstSundayOfAdvent(year + 1);

    // Check for Advent (current year)
    if (date >= firstSundayOfAdvent && date < new Date(year, 11, 25)) {
      return 'advent';
    }

    // Christmas Season (Dec 25 - Baptism of Lord, usually after Jan 6)
    const epiphany = new Date(year, 0, 6);
    const epiphanyDayOfWeek = epiphany.getDay();
    const baptismOfLord = new Date(year, 0, 6 + ((7 - (epiphanyDayOfWeek || 7)) % 7) + 1);
    if (month === 11 && day >= 25 || (month === 0 && date <= baptismOfLord)) {
      return 'christmas';
    }

    // Lent and Easter
    if (date >= ashWednesday && date < easter) {
      return 'lent';
    }

    if (date >= easter && date <= pentecost) {
      return 'easter';
    }

    // Ordinary Time
    if (date > baptismOfLord && date < ashWednesday) {
      return 'ordinary_time_winter';
    }

    if (date > pentecost && date < firstSundayOfAdventNext) {
      return 'ordinary_time_summer_fall';
    }

    // Handle late December before Advent
    if (month === 11 && date >= firstSundayOfAdventNext) {
      return 'advent';
    }

    return 'ordinary_time_summer_fall';
  }

  /**
   * Get the liturgical color for a date
   */
  static getColor(date: Date, season: LiturgicalSeason, celebration?: Celebration): LiturgicalColor {
    if (celebration?.color) {
      return celebration.color;
    }

    const dayOfWeek = date.getDay();
    const isSunday = dayOfWeek === 0;

    // Gaudete Sunday (3rd Sunday of Advent) and Laetare Sunday (4th Sunday of Lent)
    // are rose colored - simplified check here

    switch (season) {
      case 'advent':
        return 'violet';
      case 'christmas':
        return 'white';
      case 'lent':
        return 'violet';
      case 'easter':
        return 'white';
      case 'ordinary_time_winter':
      case 'ordinary_time_summer_fall':
        return 'green';
      default:
        return 'green';
    }
  }

  /**
   * Get fixed feast days (month/day based)
   */
  static getFixedFeasts(month: number, day: number): Celebration | null {
    const fixedFeasts: Record<string, Celebration> = {
      // January
      '1-1': { name: 'Mary, Mother of God', rank: 'solemnity', color: 'white' },
      '1-6': { name: 'Epiphany of the Lord', rank: 'solemnity', color: 'white' },
      '1-25': { name: 'Conversion of St. Paul', rank: 'feast', color: 'white' },
      '1-28': { name: 'St. Thomas Aquinas', rank: 'memorial', color: 'white' },

      // February
      '2-2': { name: 'Presentation of the Lord', rank: 'feast', color: 'white' },
      '2-5': { name: 'St. Agatha', rank: 'memorial', color: 'red' },
      '2-14': { name: 'Sts. Cyril and Methodius', rank: 'memorial', color: 'white' },
      '2-22': { name: 'Chair of St. Peter', rank: 'feast', color: 'white' },

      // March
      '3-19': { name: 'St. Joseph', rank: 'solemnity', color: 'white' },
      '3-25': { name: 'Annunciation of the Lord', rank: 'solemnity', color: 'white' },

      // April
      '4-23': { name: 'St. George', rank: 'memorial', color: 'red' },
      '4-25': { name: 'St. Mark', rank: 'feast', color: 'red' },
      '4-29': { name: 'St. Catherine of Siena', rank: 'memorial', color: 'white' },

      // May
      '5-3': { name: 'Sts. Philip and James', rank: 'feast', color: 'red' },
      '5-31': { name: 'Visitation of the Blessed Virgin Mary', rank: 'feast', color: 'white' },

      // June
      '6-11': { name: 'St. Barnabas', rank: 'memorial', color: 'white' },
      '6-24': { name: 'Nativity of St. John the Baptist', rank: 'solemnity', color: 'white' },
      '6-29': { name: 'Sts. Peter and Paul', rank: 'solemnity', color: 'red' },
      '6-30': { name: 'First Martyrs of the Church of Rome', rank: 'memorial', color: 'red' },

      // July
      '7-3': { name: 'St. Thomas', rank: 'feast', color: 'red' },
      '7-22': { name: 'St. Mary Magdalene', rank: 'feast', color: 'white' },
      '7-25': { name: 'St. James', rank: 'feast', color: 'red' },
      '7-26': { name: 'Sts. Joachim and Anne', rank: 'memorial', color: 'white' },
      '7-31': { name: 'St. Ignatius of Loyola', rank: 'memorial', color: 'white' },

      // August
      '8-6': { name: 'Transfiguration of the Lord', rank: 'feast', color: 'white' },
      '8-10': { name: 'St. Lawrence', rank: 'feast', color: 'red' },
      '8-15': { name: 'Assumption of Mary', rank: 'solemnity', color: 'white' },
      '8-24': { name: 'St. Bartholomew', rank: 'feast', color: 'red' },
      '8-29': { name: 'Martyrdom of St. John the Baptist', rank: 'memorial', color: 'red' },

      // September
      '9-14': { name: 'Exaltation of the Holy Cross', rank: 'feast', color: 'red' },
      '9-15': { name: 'Our Lady of Sorrows', rank: 'memorial', color: 'white' },
      '9-21': { name: 'St. Matthew', rank: 'feast', color: 'red' },
      '9-29': { name: 'Sts. Michael, Gabriel, Raphael', rank: 'feast', color: 'white' },

      // October
      '10-4': { name: 'St. Francis of Assisi', rank: 'memorial', color: 'white' },
      '10-18': { name: 'St. Luke', rank: 'feast', color: 'red' },
      '10-28': { name: 'Sts. Simon and Jude', rank: 'feast', color: 'red' },

      // November
      '11-1': { name: 'All Saints', rank: 'solemnity', color: 'white' },
      '11-2': { name: 'All Souls', rank: 'commemoration', color: 'purple' },
      '11-9': { name: 'Dedication of Lateran Basilica', rank: 'feast', color: 'white' },
      '11-21': { name: 'Presentation of Mary', rank: 'memorial', color: 'white' },

      // December
      '12-4': { name: 'St. John Damascene', rank: 'memorial', color: 'white' },
      '12-6': { name: 'St. Nicholas', rank: 'memorial', color: 'white' },
      '12-7': { name: 'St. Ambrose', rank: 'memorial', color: 'white' },
      '12-8': { name: 'Immaculate Conception', rank: 'solemnity', color: 'white' },
      '12-12': { name: 'Our Lady of Guadalupe', rank: 'memorial', color: 'white' },
      '12-21': { name: 'St. Peter Canisius', rank: 'memorial', color: 'white' },
      '12-26': { name: 'St. Stephen', rank: 'feast', color: 'red' },
      '12-27': { name: 'St. John', rank: 'feast', color: 'white' },
      '12-28': { name: 'Holy Innocents', rank: 'feast', color: 'red' },
      '12-29': { name: 'St. Thomas Becket', rank: 'memorial', color: 'red' },
    };

    return fixedFeasts[`${month + 1}-${day}`] || null;
  }

  /**
   * Get movable feasts based on Easter
   */
  static getMovableFeasts(date: Date, year: number): Celebration | null {
    const easter = this.getEasterDate(year);
    const ashWednesday = this.getAshWednesday(year);
    const pentecost = this.getPentecost(year);

    // Calculate days difference from Easter
    const diffTime = date.getTime() - easter.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Pre-Lent and Lent
    if (date.getTime() === ashWednesday.getTime()) {
      return { name: 'Ash Wednesday', rank: 'ferial', color: 'violet' };
    }

    // Calculate Sundays of Lent
    const ashWednesdayDayOfWeek = ashWednesday.getDay();
    const daysToFirstSundayOfLent = 6 - ashWednesdayDayOfWeek;
    const firstSundayOfLent = new Date(ashWednesday.getTime() + daysToFirstSundayOfLent * 24 * 60 * 60 * 1000);
    const weeksFromFirstSunday = Math.floor((date.getTime() - firstSundayOfLent.getTime()) / (7 * 24 * 60 * 60 * 1000));

    if (date.getDay() === 0 && date >= firstSundayOfLent && date < easter) {
      if (weeksFromFirstSunday === 3) {
        return { name: 'Laetare Sunday', rank: 'ferial', color: 'rose' };
      }
    }

    // Holy Week
    const palmSunday = new Date(easter.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (date.getTime() === palmSunday.getTime()) {
      return { name: 'Palm Sunday of the Lord\'s Passion', rank: 'feast', color: 'red' };
    }

    const holyThursday = new Date(easter.getTime() - 3 * 24 * 60 * 60 * 1000);
    if (date.getTime() === holyThursday.getTime()) {
      return { name: 'Holy Thursday', rank: 'ferial', color: 'white' };
    }

    const goodFriday = new Date(easter.getTime() - 2 * 24 * 60 * 60 * 1000);
    if (date.getTime() === goodFriday.getTime()) {
      return { name: 'Good Friday of the Lord\'s Passion', rank: 'ferial', color: 'red' };
    }

    const holySaturday = new Date(easter.getTime() - 1 * 24 * 60 * 60 * 1000);
    if (date.getTime() === holySaturday.getTime()) {
      return { name: 'Holy Saturday', rank: 'ferial', color: 'violet' };
    }

    // Easter Octave
    if (diffDays >= 0 && diffDays <= 7) {
      if (diffDays === 0) {
        return { name: 'Easter Sunday of the Resurrection', rank: 'solemnity', color: 'white' };
      }
      return { name: 'Easter Octave Day', rank: 'solemnity', color: 'white' };
    }

    // Ascension (Thursday 40 days after Easter, or Sunday 43 days)
    const ascensionSunday = new Date(easter.getTime() + 43 * 24 * 60 * 60 * 1000);
    if (date.getTime() === ascensionSunday.getTime()) {
      return { name: 'Ascension of the Lord', rank: 'solemnity', color: 'white' };
    }

    // Pentecost
    if (date.getTime() === pentecost.getTime()) {
      return { name: 'Pentecost Sunday', rank: 'solemnity', color: 'red' };
    }

    // Trinity Sunday (Sunday after Pentecost)
    const trinitySunday = new Date(pentecost.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (date.getTime() === trinitySunday.getTime()) {
      return { name: 'Most Holy Trinity', rank: 'solemnity', color: 'white' };
    }

    // Corpus Christi (Thursday 60 days after Easter, or Sunday 63 days)
    const corpusChristiSunday = new Date(easter.getTime() + 63 * 24 * 60 * 60 * 1000);
    if (date.getTime() === corpusChristiSunday.getTime()) {
      return { name: 'Most Holy Body and Blood of Christ', rank: 'solemnity', color: 'white' };
    }

    // Sacred Heart (Friday 68 days after Easter)
    const sacredHeart = new Date(easter.getTime() + 68 * 24 * 60 * 60 * 1000);
    if (date.getTime() === sacredHeart.getTime()) {
      return { name: 'Most Sacred Heart of Jesus', rank: 'solemnity', color: 'white' };
    }

    // Christ the King (last Sunday of Ordinary Time, before Advent)
    const firstSundayOfAdvent = this.getFirstSundayOfAdvent(year);
    const christTheKing = new Date(firstSundayOfAdvent.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (date.getTime() === christTheKing.getTime()) {
      return { name: 'Our Lord Jesus Christ, King of the Universe', rank: 'solemnity', color: 'white' };
    }

    return null;
  }

  /**
   * Get Sunday of the year
   */
  static getSundayOfSeason(date: Date, season: LiturgicalSeason): string | null {
    if (date.getDay() !== 0) return null;

    const year = date.getFullYear();
    const easter = this.getEasterDate(year);
    const ashWednesday = this.getAshWednesday(year);
    const pentecost = this.getPentecost(year);
    const firstSundayOfAdvent = this.getFirstSundayOfAdvent(year);

    switch (season) {
      case 'advent': {
        const weeksFromFirstSunday = Math.floor((date.getTime() - firstSundayOfAdvent.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
        return `${weeksFromFirstSunday}${this.getOrdinal(weeksFromFirstSunday)} Sunday of Advent`;
      }
      case 'christmas': {
        // Christmas season Sundays
        const christmas = new Date(year - 1, 11, 25);
        if (date.getTime() === christmas.getTime() || date.getTime() === new Date(year, 11, 25).getTime()) {
          return 'Nativity of the Lord';
        }
        const holyFamily = new Date(year, 0, 1);
        if (date.getDay() === 0 && date.getMonth() === 0 && date.getDate() <= 7) {
          return 'Holy Family';
        }
        const epiphany = new Date(year, 0, 6);
        const epiphanyDayOfWeek = epiphany.getDay();
        if (date.getDate() >= 6 - (epiphanyDayOfWeek || 7) && date.getDate() <= 12 - (epiphanyDayOfWeek || 7)) {
          return 'Epiphany of the Lord';
        }
        const baptism = new Date(year, 0, 6 + ((7 - (epiphanyDayOfWeek || 7)) % 7) + 1);
        if (date.getTime() === baptism.getTime()) {
          return 'Baptism of the Lord';
        }
        return 'Sunday after Christmas';
      }
      case 'lent': {
        const ashWednesdayDayOfWeek = ashWednesday.getDay();
        const daysToFirstSunday = 6 - ashWednesdayDayOfWeek;
        const firstSundayOfLent = new Date(ashWednesday.getTime() + daysToFirstSunday * 24 * 60 * 60 * 1000);
        const weeksFromFirstSunday = Math.floor((date.getTime() - firstSundayOfLent.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
        if (weeksFromFirstSunday === 3) {
          return 'Laetare Sunday (4th Sunday of Lent)';
        }
        return `${weeksFromFirstSunday}${this.getOrdinal(weeksFromFirstSunday)} Sunday of Lent`;
      }
      case 'easter': {
        const diffTime = date.getTime() - easter.getTime();
        const weeksFromEaster = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000)) + 1;
        if (weeksFromEaster === 1) return 'Divine Mercy Sunday (2nd Sunday of Easter)';
        return `${weeksFromEaster}${this.getOrdinal(weeksFromEaster)} Sunday of Easter`;
      }
      case 'ordinary_time_summer_fall': {
        const trinitySunday = new Date(pentecost.getTime() + 7 * 24 * 60 * 60 * 1000);
        const weeksFromTrinity = Math.floor((date.getTime() - trinitySunday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
        if (weeksFromTrinity > 0) {
          return `${weeksFromTrinity}${this.getOrdinal(weeksFromTrinity)} Sunday in Ordinary Time`;
        }
        return 'Sunday in Ordinary Time';
      }
      case 'ordinary_time_winter': {
        const baptismOfLord = new Date(year, 0, 6 + ((7 - (new Date(year, 0, 6).getDay() || 7)) % 7) + 1);
        const weeksFromBaptism = Math.floor((date.getTime() - baptismOfLord.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
        if (weeksFromBaptism > 0) {
          return `${weeksFromBaptism}${this.getOrdinal(weeksFromBaptism)} Sunday in Ordinary Time`;
        }
        return 'Sunday in Ordinary Time';
      }
      default:
        return null;
    }
  }

  static getOrdinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return (s[(v - 20) % 10] || s[v] || s[0]);
  }

  /**
   * Get complete liturgical information for a date
   */
  static getLiturgicalDay(date: Date): LiturgicalDay {
    const year = date.getFullYear();
    const season = this.getSeason(date);

    // Check for movable feasts first
    let celebration = this.getMovableFeasts(date, year);

    // Check for fixed feasts
    if (!celebration) {
      celebration = this.getFixedFeasts(date.getMonth(), date.getDate());
    }

    // Check for Sunday designation
    const isSunday = date.getDay() === 0;
    const sundayName = isSunday ? this.getSundayOfSeason(date, season) : null;

    // If it's a Sunday without a celebration, add it
    if (isSunday && !celebration && sundayName) {
      celebration = {
        name: sundayName,
        rank: 'ferial'
      };
    }

    const color = this.getColor(date, season, celebration);

    // Get Week of the Psalter (4-week cycle starting with First Sunday of Advent)
    const psalterWeek = this.getPsalterWeek(date, year);

    // Get Week of Ordinary Time
    const weekOfOrdinaryTime = this.getWeekOfOrdinaryTime(date, season, year);

    // Get Daily Readings
    const dailyReadings = this.getDailyReadings(date, season, celebration, weekOfOrdinaryTime);

    return {
      date,
      season,
      color,
      celebration,
      isSunday,
      psalterWeek,
      dailyReadings,
      weekOfOrdinaryTime
    };
  }

  /**
   * Get the Week of the Psalter (Week I, II, III, or IV)
   * 4-week cycle starting with the First Sunday of Advent
   */
  static getPsalterWeek(date: Date, year: number): number {
    const firstSundayOfAdvent = this.getFirstSundayOfAdvent(year);

    // If we're before First Sunday of Advent, use the previous year's Advent
    let referenceAdvent = firstSundayOfAdvent;
    if (date < referenceAdvent) {
      referenceAdvent = this.getFirstSundayOfAdvent(year - 1);
    }

    // Calculate days since reference Advent Sunday
    const daysSince = Math.floor((date.getTime() - referenceAdvent.getTime()) / (1000 * 60 * 60 * 24));

    // 4-week cycle: Week I, II, III, IV
    const weekNum = Math.floor(daysSince / 7) % 4;
    return weekNum + 1; // Returns 1, 2, 3, or 4
  }

  /**
   * Get the week number in Ordinary Time
   */
  static getWeekOfOrdinaryTime(date: Date, season: LiturgicalSeason, year: number): number | undefined {
    if (season !== 'ordinary_time_winter' && season !== 'ordinary_time_summer_fall') {
      return undefined;
    }

    const baptismOfLord = this.getBaptismOfLord(year);
    const firstSundayOfAdvent = this.getFirstSundayOfAdvent(year);

    // Winter Ordinary Time (after Baptism of Lord)
    if (season === 'ordinary_time_winter' && date >= baptismOfLord) {
      const daysSince = Math.floor((date.getTime() - baptismOfLord.getTime()) / (1000 * 60 * 60 * 24));
      return Math.floor(daysSince / 7) + 1;
    }

    // Summer/Fall Ordinary Time (after Pentecost)
    if (season === 'ordinary_time_summer_fall') {
      const pentecost = this.getPentecost(year);
      const daysSince = Math.floor((date.getTime() - pentecost.getTime()) / (1000 * 60 * 60 * 24));
      return Math.floor(daysSince / 7) + 1;
    }

    return undefined;
  }

  /**
   * Get Baptism of the Lord date
   */
  static getBaptismOfLord(year: number): Date {
    const epiphany = new Date(year, 0, 6);
    const epiphanyDayOfWeek = epiphany.getDay();
    return new Date(year, 0, 6 + ((7 - (epiphanyDayOfWeek || 7)) % 7) + 1);
  }

  /**
   * Get Daily Readings for a given date
   */
  static getDailyReadings(date: Date, season: LiturgicalSeason, celebration?: Celebration, weekOfOrdinaryTime?: number): DailyReadings {
    const dayOfWeek = date.getDay();
    const isSunday = dayOfWeek === 0;

    // For Sundays and Solemnities, return the Sunday reading cycle
    if (isSunday || celebration?.rank === 'solemnity') {
      return this.getSundayReadings(date, season, celebration, weekOfOrdinaryTime);
    }

    // For weekdays, return ferial readings
    return this.getWeekdayReadings(date, season, weekOfOrdinaryTime);
  }

  /**
   * Get Sunday Readings (3-year cycle for Sundays: A, B, C)
   */
  static getSundayReadings(date: Date, season: LiturgicalSeason, celebration?: Celebration, weekOfOrdinaryTime?: number): DailyReadings {
    const year = date.getFullYear();
    // Cycle: Year A (Matthew), Year B (Mark), Year C (Luke)
    const cycle = ['A', 'B', 'C'][(year - 1) % 3];

    if (season === 'advent') {
      return {
        firstReading: { citation: 'Isaiah 2:1-5', book: 'Isaiah' },
        responsorialPsalm: { citation: 'Ps 122:1-2, 3-4, 4-5, 6-7, 8-9' },
        secondReading: { citation: 'Romans 13:11-14', book: 'Romans' },
        gospel: { citation: 'Matthew 24:37-44', book: 'Matthew' },
        gospelAcclamation: 'Alleluia'
      };
    }

    if (season === 'christmas') {
      if (celebration?.name === 'Nativity of the Lord' || celebration?.name === 'Holy Family') {
        return {
          firstReading: { citation: 'Isaiah 9:1-6', book: 'Isaiah' },
          responsorialPsalm: { citation: 'Ps 98:1, 2-3, 3-4, 5-6' },
          secondReading: { citation: 'Titus 2:11-14', book: 'Titus' },
          gospel: { citation: 'Luke 2:1-14', book: 'Luke' },
          gospelAcclamation: 'Alleluia'
        };
      }
      if (celebration?.name === 'Epiphany of the Lord') {
        return {
          firstReading: { citation: 'Isaiah 60:1-6', book: 'Isaiah' },
          responsorialPsalm: { citation: 'Ps 72:1-2, 7-8, 10-11, 12-13' },
          secondReading: { citation: 'Ephesians 3:2-3, 5-6', book: 'Ephesians' },
          gospel: { citation: 'Matthew 2:1-12', book: 'Matthew' },
          gospelAcclamation: 'Alleluia'
        };
      }
      if (celebration?.name === 'Baptism of the Lord') {
        return {
          firstReading: { citation: 'Isaiah 42:1-4, 6-7', book: 'Isaiah' },
          responsorialPsalm: { citation: 'Ps 29:1-2, 3-4, 3, 9-10' },
          secondReading: { citation: 'Acts 10:34-38', book: 'Acts' },
          gospel: { citation: 'Luke 3:15-16, 21-22', book: 'Luke' },
          gospelAcclamation: 'Alleluia'
        };
      }
    }

    if (season === 'lent') {
      if (celebration?.name === 'Palm Sunday of the Lord\'s Passion') {
        return {
          firstReading: { citation: 'Isaiah 50:4-7', book: 'Isaiah' },
          responsorialPsalm: { citation: 'Ps 22:8-9, 17-18, 19-20, 23-24' },
          secondReading: { citation: 'Philippians 2:6-11', book: 'Philippians' },
          gospel: { citation: 'Matthew 26:14-27:66', book: 'Matthew' },
          gospelAcclamation: '' // No Alleluia during Lent
        };
      }
      if (celebration?.name === 'Easter Sunday of the Resurrection') {
        return {
          firstReading: { citation: 'Acts 10:34, 37-43', book: 'Acts' },
          responsorialPsalm: { citation: 'Ps 118:1-2, 16-17, 22-23' },
          secondReading: { citation: 'Colossians 3:1-4', book: 'Colossians' },
          gospel: { citation: 'John 20:1-9', book: 'John' },
          gospelAcclamation: 'Alleluia'
        };
      }
      // Regular Lent Sundays
      return {
        firstReading: { citation: 'Genesis 2:7-9; 3:1-7', book: 'Genesis' },
        responsorialPsalm: { citation: 'Ps 51:3-4, 5-6, 12-13, 17' },
        secondReading: { citation: 'Romans 5:12-19', book: 'Romans' },
        gospel: { citation: 'Matthew 4:1-11', book: 'Matthew' },
        gospelAcclamation: 'Praise to you, Lord Jesus Christ'
      };
    }

    if (season === 'easter') {
      return {
        firstReading: { citation: 'Acts 2:14, 22-33', book: 'Acts' },
        responsorialPsalm: { citation: 'Ps 16:1-2, 5, 7-11' },
        secondReading: { citation: '1 Peter 1:17-21', book: '1 Peter' },
        gospel: { citation: 'John 20:19-31', book: 'John' },
        gospelAcclamation: 'Alleluia'
      };
    }

    if (weekOfOrdinaryTime && weekOfOrdinaryTime <= 34) {
      // Ordinary Time Sunday readings follow a pattern
      return this.getOrdinaryTimeSundayReadings(weekOfOrdinaryTime, cycle);
    }

    return {};
  }

  /**
   * Get Ordinary Time Sunday Readings based on week number and cycle year
   */
  static getOrdinaryTimeSundayReadings(week: number, cycle: string): DailyReadings {
    // Simplified pattern for Ordinary Time Sundays
    // In practice, this would be a comprehensive lookup table

    if (week === 1) {
      return {
        firstReading: { citation: 'Ezekiel 33:7-9', book: 'Ezekiel' },
        responsorialPsalm: { citation: 'Ps 95:1-2, 6-9' },
        secondReading: { citation: 'Romans 13:8-10', book: 'Romans' },
        gospel: { citation: 'Matthew 18:15-20', book: 'Matthew' },
        gospelAcclamation: 'Alleluia'
      };
    }

    if (week === 23) {
      return {
        firstReading: { citation: 'Isaiah 35:4-7', book: 'Isaiah' },
        responsorialPsalm: { citation: 'Ps 146:6-7, 8-9, 9-10' },
        secondReading: { citation: 'James 5:1-6', book: 'James' },
        gospel: { citation: 'Mark 10:46-52', book: 'Mark' },
        gospelAcclamation: 'Alleluia'
      };
    }

    if (week === 33 || week === 34) {
      return {
        firstReading: { citation: 'Daniel 12:1-3', book: 'Daniel' },
        responsorialPsalm: { citation: 'Ps 16:5, 8, 9-10, 11' },
        secondReading: { citation: 'Hebrews 10:11-14, 18', book: 'Hebrews' },
        gospel: { citation: 'Mark 13:24-32', book: 'Mark' },
        gospelAcclamation: 'Alleluia'
      };
    }

    // Default Ordinary Time Sunday
    return {
      firstReading: { citation: 'Proverbs 31:10-13, 19-20, 30-31', book: 'Proverbs' },
      responsorialPsalm: { citation: 'Ps 128:1-5' },
      secondReading: { citation: '1 Thessalonians 5:1-6', book: '1 Thessalonians' },
      gospel: { citation: 'Matthew 25:14-30', book: 'Matthew' },
      gospelAcclamation: 'Alleluia'
    };
  }

  /**
   * Get Weekday Readings (2-year cycle for weekdays: Year I and II)
   */
  static getWeekdayReadings(date: Date, season: LiturgicalSeason, weekOfOrdinaryTime?: number): DailyReadings {
    // Weekday cycle: Year I (odd years), Year II (even years)
    const year = date.getFullYear();
    const weekdayCycle = year % 2 === 0 ? 'II' : 'I';

    const dayOfWeek = date.getDay();

    if (season === 'advent' || season === 'christmas' || season === 'lent' || season === 'easter') {
      // Special seasons have proper weekday readings
      return this.getSeasonalWeekdayReadings(date, season);
    }

    // Ordinary Time weekday readings
    return this.getOrdinaryTimeWeekdayReadings(date, weekdayCycle);
  }

  /**
   * Get seasonal weekday readings
   */
  static getSeasonalWeekdayReadings(date: Date, season: LiturgicalSeason): DailyReadings {
    // Simplified for major seasons - in practice would be a comprehensive calendar
    const readings = {
      'advent': {
        firstReading: { citation: 'Isaiah 11:1-10', book: 'Isaiah' },
        responsorialPsalm: { citation: 'Ps 72:1-2, 12-13, 18-19' },
        gospel: { citation: 'Luke 10:21-24', book: 'Luke' },
        gospelAcclamation: 'Alleluia'
      },
      'christmas': {
        firstReading: { citation: '1 John 3:22-29', book: '1 John' },
        responsorialPsalm: { citation: 'Ps 98:3-4, 5-6, 7-8, 9' },
        gospel: { citation: 'John 20:2-8', book: 'John' },
        gospelAcclamation: 'Alleluia'
      },
      'lent': {
        firstReading: { citation: 'Deuteronomy 30:15-20', book: 'Deuteronomy' },
        responsorialPsalm: { citation: 'Ps 1:1-2, 3, 4, 6' },
        gospel: { citation: 'Luke 9:22-25', book: 'Luke' },
        gospelAcclamation: 'Praise to you, Lord Jesus Christ'
      },
      'easter': {
        firstReading: { citation: 'Acts 4:32-37', book: 'Acts' },
        responsorialPsalm: { citation: 'Ps 118:2-4, 13-15, 22-24' },
        gospel: { citation: 'John 3:7-15', book: 'John' },
        gospelAcclamation: 'Alleluia'
      }
    };

    return readings[season] || {};
  }

  /**
   * Get Ordinary Time weekday readings
   */
  static getOrdinaryTimeWeekdayReadings(date: Date, cycle: string): DailyReadings {
    const dayOfWeek = date.getDay();

    // Monday
    if (dayOfWeek === 1) {
      return {
        firstReading: { citation: cycle === 'I' ? '1 Kings 8:1-7' : '2 Samuel 15:1-3', book: cycle === 'I' ? '1 Kings' : '2 Samuel' },
        responsorialPsalm: { citation: 'Ps 122:1-2, 3-4, 4-5' },
        gospel: { citation: 'Mark 6:53-56', book: 'Mark' },
        gospelAcclamation: 'Alleluia'
      };
    }

    // Tuesday
    if (dayOfWeek === 2) {
      return {
        firstReading: { citation: cycle === 'I' ? '1 Kings 8:22-30' : '2 Samuel 18:9-10', book: cycle === 'I' ? '1 Kings' : '2 Samuel' },
        responsorialPsalm: { citation: 'Ps 84:3-4, 5-6, 12, 10' },
        gospel: { citation: 'Mark 7:1-13', book: 'Mark' },
        gospelAcclamation: 'Alleluia'
      };
    }

    // Wednesday
    if (dayOfWeek === 3) {
      return {
        firstReading: { citation: cycle === 'I' ? '1 Kings 10:1-10' : '2 Samuel 24:5-10', book: cycle === 'I' ? '1 Kings' : '2 Samuel' },
        responsorialPsalm: { citation: 'Ps 37:5-6, 30-31, 39-40' },
        gospel: { citation: 'Mark 7:31-37', book: 'Mark' },
        gospelAcclamation: 'Alleluia'
      };
    }

    // Thursday
    if (dayOfWeek === 4) {
      return {
        firstReading: { citation: cycle === 'I' ? '1 Kings 11:4-13' : '1 Kings 11:29-32', book: '1 Kings' },
        responsorialPsalm: { citation: 'Ps 106:3-4, 35-36, 37-38' },
        gospel: { citation: 'Mark 8:11-13', book: 'Mark' },
        gospelAcclamation: 'Alleluia'
      };
    }

    // Friday
    if (dayOfWeek === 5) {
      return {
        firstReading: { citation: cycle === 'I' ? '1 Kings 12:26-32' : '1 Kings 11:1-6', book: '1 Kings' },
        responsorialPsalm: { citation: 'Ps 81:3-4, 5-6, 8-9' },
        gospel: { citation: 'Mark 8:14-21', book: 'Mark' },
        gospelAcclamation: 'Alleluia'
      };
    }

    // Saturday
    if (dayOfWeek === 6) {
      return {
        firstReading: { citation: cycle === 'I' ? '1 Kings 13:1-10' : '1 Kings 12:1-7', book: '1 Kings' },
        responsorialPsalm: { citation: 'Ps 119:1-2, 3-4, 5-6' },
        gospel: { citation: 'Mark 9:2-13', book: 'Mark' },
        gospelAcclamation: 'Alleluia'
      };
    }

    return {};
  }
}

// Color display names and descriptions
const COLOR_INFO: Record<LiturgicalColor, { name: string; hex: string; meaning: string }> = {
  green: { name: 'Green', hex: '#22c55e', meaning: 'Ordinary Time - growth and hope' },
  purple: { name: 'Purple', hex: '#9333ea', meaning: 'Penitence and preparation' },
  violet: { name: 'Violet', hex: '#8b5cf6', meaning: 'Penitence and preparation' },
  white: { name: 'White', hex: '#f8fafc', meaning: 'Celebration and joy' },
  red: { name: 'Red', hex: '#ef4444', meaning: 'Holy Spirit, martyrs, Passion' },
  rose: { name: 'Rose', hex: '#fb923c', meaning: 'Joy amidst penance' },
  gold: { name: 'Gold', hex: '#fbbf24', meaning: 'Highest solemnities' }
};

const SEASON_INFO: Record<LiturgicalSeason, { name: string; emoji: string; description: string }> = {
  advent: { name: 'Advent', emoji: '🕯️', description: 'Season of preparation for Christmas' },
  christmas: { name: 'Christmas', emoji: '🎄', description: 'Celebration of the birth of Christ' },
  ordinary_time_winter: { name: 'Ordinary Time', emoji: '⏳', description: 'Growth in the life of Christ' },
  lent: { name: 'Lent', emoji: '🙏', description: 'Season of penance and preparation for Easter' },
  easter: { name: 'Easter', emoji: '✨', description: 'Celebration of the Resurrection' },
  ordinary_time_summer_fall: { name: 'Ordinary Time', emoji: '⏳', description: 'Growth in the life of Christ' },
  advent_christmas: { name: 'Advent/Christmas', emoji: '🕯️', description: 'Transition period' }
};

const RANK_NAMES: Record<CelebrationRank, string> = {
  solemnity: 'Solemnity',
  feast: 'Feast',
  memorial: 'Memorial',
  memorial_optional: 'Optional Memorial',
  commemoration: 'Commemoration',
  ferial: 'Ferial'
};

export default function LiturgicalCalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMonth, setViewMonth] = useState(new Date());

  const todayInfo = useMemo(() => LiturgicalCalendar.getLiturgicalDay(currentDate), [currentDate]);
  const selectedInfo = useMemo(() => LiturgicalCalendar.getLiturgicalDay(selectedDate), [selectedDate]);

  // Generate calendar days for the view
  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();

    const days: Date[] = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 weeks = 42 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }, [viewMonth]);

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
    setViewMonth(now);
  };

  const previousMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === viewMonth.getMonth();
  };

  const getDayInfo = (date: Date) => {
    return LiturgicalCalendar.getLiturgicalDay(date);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with Today button */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shrink-0">
        <h2 className="text-lg font-semibold">Liturgical Calendar</h2>
        <button
          onClick={goToToday}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
        >
          Today
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Today's Info Card */}
        <div className="m-4 p-4 bg-white rounded-2xl shadow-md border-2"
          style={{ borderColor: COLOR_INFO[todayInfo.color].hex }}>
          <div className="flex items-start gap-3">
            <div className="text-4xl">{SEASON_INFO[todayInfo.season].emoji}</div>
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">
                {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="font-semibold text-lg" style={{ color: COLOR_INFO[todayInfo.color].hex }}>
                {SEASON_INFO[todayInfo.season].name}
              </div>

              {/* Psalter Week */}
              {todayInfo.psalterWeek && (
                <div className="text-sm text-gray-600 mt-1">
                  📿 Week {['I', 'II', 'III', 'IV'][todayInfo.psalterWeek - 1]} of the Psalter
                  {todayInfo.weekOfOrdinaryTime && ` • Week ${todayInfo.weekOfOrdinaryTime} of Ordinary Time`}
                </div>
              )}

              {todayInfo.celebration && (
                <div className="mt-2">
                  <div className="font-medium text-gray-900">{todayInfo.celebration.name}</div>
                  <div className="text-sm text-gray-500">{RANK_NAMES[todayInfo.celebration.rank]}</div>
                </div>
              )}

              <div className="mt-2 text-sm text-gray-600">
                <span className="inline-block w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: COLOR_INFO[todayInfo.color].hex }}></span>
                {COLOR_INFO[todayInfo.color].name} - {COLOR_INFO[todayInfo.color].meaning}
              </div>

              {/* Today's Reading Reference */}
              {todayInfo.dailyReadings?.gospel && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">📖 Today's Gospel:</div>
                  <div className="text-sm text-gray-900">
                    {todayInfo.dailyReadings.gospel.book} - {todayInfo.dailyReadings.gospel.citation}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Month navigation */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
              <button onClick={previousMonth} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                {monthNames[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </h3>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 px-2 py-2 bg-gray-50">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 px-2 pb-2">
              {calendarDays.map((date, idx) => {
                const dayInfo = getDayInfo(date);
                const isSelected = isSameDay(date, selectedDate);
                const isToday = isSameDay(date, currentDate);
                const inMonth = isCurrentMonth(date);
                const colorInfo = COLOR_INFO[dayInfo.color];

                // Get a short label for the day - make more readable
                const dayLabel = dayInfo.celebration
                  ? (dayInfo.celebration.name.length > 20
                      ? dayInfo.celebration.name.substring(0, 17) + '...'
                      : dayInfo.celebration.name)
                  : (dayInfo.isSunday
                      ? SEASON_INFO[dayInfo.season].name
                      : (dayInfo.season === 'ordinary_time_winter' || dayInfo.season === 'ordinary_time_summer_fall'
                          ? 'Ord. Time'
                          : SEASON_INFO[dayInfo.season].name));

                // Get darker shade for better readability
                const textColor = isSelected ? '#1f2937' : colorInfo.hex;

                return (
                  <button
                    key={idx}
                    onClick={() => handleDayClick(date)}
                    className={`
                      aspect-square rounded-lg flex flex-col relative p-1
                      transition-all duration-200
                      ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                      ${isToday ? 'font-bold' : ''}
                      ${inMonth ? 'text-gray-900' : 'text-gray-400'}
                      ${!inMonth ? 'bg-gray-50' : 'hover:bg-gray-100'}
                    `}
                    style={isSelected ? { backgroundColor: colorInfo.hex } : undefined}
                    title={dayInfo.celebration?.name || SEASON_INFO[dayInfo.season].name}
                  >
                    {/* Date number at top */}
                    <div className="flex justify-between items-start w-full">
                      <span className={`text-sm font-bold ${isToday ? 'text-blue-600' : ''}`}>
                        {date.getDate()}
                      </span>
                      {isToday && (
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 mt-0.5"></span>
                      )}
                    </div>

                    {/* Day heading/label under the date */}
                    <div className="flex-1 flex items-center justify-center py-0.5">
                      <span
                        className="text-[9px] leading-tight text-center w-full px-0.5 rounded font-medium"
                        style={{
                          color: textColor,
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.03)',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontWeight: 600,
                          textShadow: '0 0.5px 0.5px rgba(0,0,0,0.1)'
                        }}
                      >
                        {dayLabel}
                      </span>
                    </div>

                    {/* Color indicator at bottom */}
                    <div className="flex justify-center w-full pb-0.5">
                      <span
                        className="w-6 h-1 rounded-full"
                        style={{ backgroundColor: colorInfo.hex }}
                        title={colorInfo.name}
                      ></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h4 className="font-semibold text-gray-900 mb-3">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h4>

            <div className="space-y-3">
              {/* Season Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: COLOR_INFO[selectedInfo.color].hex + '20' }}>
                  {SEASON_INFO[selectedInfo.season].emoji}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {SEASON_INFO[selectedInfo.season].name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedInfo.isSunday ? 'Sunday' : ''}
                    {selectedInfo.weekOfOrdinaryTime ? ` • Week ${selectedInfo.weekOfOrdinaryTime}` : ''}
                  </div>
                </div>
              </div>

              {/* Psalter Week (for Liturgy of the Hours) */}
              {selectedInfo.psalterWeek && (
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📿</span>
                      <span className="text-sm font-medium text-gray-700">Liturgy of the Hours:</span>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: COLOR_INFO[selectedInfo.color].hex }}>
                      Week {['I', 'II', 'III', 'IV'][selectedInfo.psalterWeek - 1]} of the Psalter
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedInfo.psalterWeek === 1 && 'Week I - Psalms: Sunday (I, II, III), Monday (I, II), Tuesday (III), Wednesday (IV), Thursday (V), Friday (VI), Saturday (VII)'}
                    {selectedInfo.psalterWeek === 2 && 'Week II - Psalms: Sunday (I, II, III), Monday (IV), Tuesday (V), Wednesday (VI), Thursday (VII), Friday (I), Saturday (II)'}
                    {selectedInfo.psalterWeek === 3 && 'Week III - Psalms: Sunday (I, II, III), Monday (II), Tuesday (III), Wednesday (IV), Thursday (I), Friday (II), Saturday (III)'}
                    {selectedInfo.psalterWeek === 4 && 'Week IV - Psalms: Sunday (I, II, III), Monday (V), Tuesday (VI), Wednesday (VII), Thursday (I), Friday (II), Saturday (IV)'}
                  </div>
                </div>
              )}

              {/* Celebration */}
              {selectedInfo.celebration && (
                <div className="border-t pt-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">✝️</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {selectedInfo.celebration.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {RANK_NAMES[selectedInfo.celebration.rank]}
                      </div>
                      {selectedInfo.celebration.description && (
                        <div className="text-xs text-gray-600 mt-1 italic">
                          {selectedInfo.celebration.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Liturgical Color */}
              <div className="border-t pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Liturgical Color:</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: COLOR_INFO[selectedInfo.color].hex }}></span>
                    <span className="text-sm font-medium" style={{ color: COLOR_INFO[selectedInfo.color].hex }}>
                      {COLOR_INFO[selectedInfo.color].name}
                    </span>
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {COLOR_INFO[selectedInfo.color].meaning}
                </div>
              </div>

              {/* Daily Readings */}
              {selectedInfo.dailyReadings && (selectedInfo.dailyReadings.firstReading || selectedInfo.dailyReadings.gospel) && (
                <div className="border-t pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">📖</span>
                    <span className="text-sm font-semibold text-gray-700">Daily Readings</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    {selectedInfo.dailyReadings.firstReading && (
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 font-semibold shrink-0">1st:</span>
                        <div>
                          <span className="text-gray-900">{selectedInfo.dailyReadings.firstReading.book}</span>
                          <span className="text-gray-600"> - {selectedInfo.dailyReadings.firstReading.citation}</span>
                        </div>
                      </div>
                    )}

                    {selectedInfo.dailyReadings.responsorialPsalm && (
                      <div className="flex items-start gap-2">
                        <span className="text-amber-600 font-semibold shrink-0">Resp:</span>
                        <span className="text-gray-600">{selectedInfo.dailyReadings.responsorialPsalm.citation}</span>
                      </div>
                    )}

                    {selectedInfo.dailyReadings.secondReading && (
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 font-semibold shrink-0">2nd:</span>
                        <div>
                          <span className="text-gray-900">{selectedInfo.dailyReadings.secondReading.book}</span>
                          <span className="text-gray-600"> - {selectedInfo.dailyReadings.secondReading.citation}</span>
                        </div>
                      </div>
                    )}

                    {selectedInfo.dailyReadings.gospel && (
                      <div className="flex items-start gap-2">
                        <span className="text-red-600 font-semibold shrink-0">Gospel:</span>
                        <div>
                          <span className="text-gray-900">{selectedInfo.dailyReadings.gospel.book}</span>
                          <span className="text-gray-600"> - {selectedInfo.dailyReadings.gospel.citation}</span>
                        </div>
                      </div>
                    )}

                    {selectedInfo.dailyReadings.gospelAcclamation && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                        <span className="text-gray-500 text-xs">Acclamation:</span>
                        <span className="text-xs font-medium text-gray-700">{selectedInfo.dailyReadings.gospelAcclamation}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

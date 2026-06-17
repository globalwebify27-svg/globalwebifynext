export interface CityInfo {
  name: string;
  subtitle: string;
}

export const CITIES_MAP: Record<string, CityInfo> = {
  india: { name: 'India', subtitle: 'Country' },
  'united-kingdom': { name: 'United Kingdom', subtitle: 'United Kingdom' },
  dubai: { name: 'Dubai', subtitle: 'United Arab Emirates' },
  delhi: { name: 'Delhi', subtitle: 'India' },
  noida: { name: 'Noida', subtitle: 'Uttar Pradesh , India' },
  gurugram: { name: 'Gurugram', subtitle: 'Haryana , India' },
  bangalore: { name: 'Bangalore', subtitle: 'Karnataka , India' },
  mumbai: { name: 'Mumbai', subtitle: 'Maharashtra , India' },
  pune: { name: 'Pune', subtitle: 'Maharashtra , India' },
  hyderabad: { name: 'Hyderabad', subtitle: 'Telangana , India' },
  kolkata: { name: 'Kolkata', subtitle: 'West Bengal , India' },
  'abu-dhabi': { name: 'Abu Dhabi', subtitle: 'United Arab Emirates' },
  sharjah: { name: 'Sharjah', subtitle: 'United Arab Emirates' },
  'al-ain': { name: 'Al Ain', subtitle: 'United Arab Emirates' },
  ajman: { name: 'Ajman', subtitle: 'United Arab Emirates' },
};

export const CITIES_LIST = Object.keys(CITIES_MAP).map(key => ({
  slug: key,
  ...CITIES_MAP[key]
}));

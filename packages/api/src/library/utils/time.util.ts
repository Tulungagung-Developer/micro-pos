import time from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

time.extend(timezone);
time.extend(utc);

const hasPassed = (valTime: Date): boolean => time(valTime).isAfter(time());

export { time, hasPassed };

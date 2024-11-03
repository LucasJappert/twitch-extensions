
export interface ISegment {
    icon: string;
    title: string;
    startTime: Date;
    endTime: Date;
}

export const GetSegmentTime = (timeInHHMMSS: string) => {
    const now = new Date();
    const splitedTime = timeInHHMMSS.split(":");
    if (splitedTime.length === 1) splitedTime.push("00", "00");
    if (splitedTime.length === 2) splitedTime.push("00");
    const [hours, minutes, seconds] = splitedTime;
    now.setHours(Number(hours));
    now.setMinutes(Number(minutes));
    now.setSeconds(Number(seconds));
    return now;
};

const IsWeekend = () => {
    const now = new Date();
    const day = now.getDay();
    return day === 0 || day === 6;
};

class Title {
    icon: string;
    title: string;
    constructor(icon: string, title: string) {
        this.icon = icon;
        this.title = title;
    }
}
const TitleEnum = {
    WORK: new Title("👨‍💻", "Deep-Work"),
    DAILY: new Title("📅", "Daily"),
    BREAK: new Title("☕", "Break"),
    LAUNCH: new Title("🍔", "Launch"),
};

export class ScheduleUtils {
    static GetTimeIntervals() {
        if (IsWeekend()) return ["8", "9:30", "9:45", "11"];

        return ["6", "8", "8:15", "10", "10:15", "12", "13", "15"];
    }

    static GetTitles() {
        if (IsWeekend()) return [TitleEnum.WORK, TitleEnum.BREAK, TitleEnum.WORK];

        return [TitleEnum.WORK, TitleEnum.DAILY, TitleEnum.WORK, TitleEnum.BREAK, TitleEnum.WORK, TitleEnum.LAUNCH, TitleEnum.WORK];
    }

    static GetSegments() {
        const timeIntervals = this.GetTimeIntervals();
        const titles = this.GetTitles();
        const segments = [];
        for (let i = 0; i < timeIntervals.length - 1; i++) {
            if (i > timeIntervals.length - 1) continue;
            const startTime = GetSegmentTime(timeIntervals[i]);
            const endTime = GetSegmentTime(timeIntervals[i + 1]);
            const segment: ISegment = {
                icon: titles[i].icon,
                title: titles[i].title,
                startTime,
                endTime,
            };
            segments.push(segment);
        }
        segments.reverse();
        return segments;
    }
}

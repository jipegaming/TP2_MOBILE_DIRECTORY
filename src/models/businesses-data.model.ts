import { SkillsGlobal } from './skills-global.model';

export class BusinessesData {
    id: number;
    name: string;
    logo: string;
    latitude: number;
    longitude: number;
    abus: number;
    skills: SkillsGlobal[];
}

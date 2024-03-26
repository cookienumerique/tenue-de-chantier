import PatrimoineZacEnum from '@/enums/PatrimoineZacEnum';

export default interface Zac {
  id: number;
  libZac: string;
  libZacMin: string;
  codStat: string;
  codSect: string;
  libAmgr: PatrimoineZacEnum;
  cod: string;
  geom: string;
}

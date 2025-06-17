import { defineStore } from 'pinia';

export interface SpoilerState {
  spoilerMode?: boolean;

  [property: string]: any;
}

const spoilerModeKey = 'AMMDS_SPOILER_MODE';

/**
 * 剧透配置
 */
export const useSpoilerStore = defineStore('spoiler', {
  state: (): SpoilerState => ({
    spoilerMode: JSON.parse(localStorage.getItem(spoilerModeKey) ?? 'true'),
  }),

  actions: {
    /**
     * 切换剧透模式状态并持久化
     */
    async toggleSpoilerMode() {
      this.spoilerMode = !this.spoilerMode;
    },
  },
  persist: true,
});

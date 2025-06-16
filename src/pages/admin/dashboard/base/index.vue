<template>
  <div class="dashboard-container">
    <!-- 数据概览区域 -->
    <t-row :gutter="[16, 16]">
      <t-col v-for="(item, index) in statisticsData" :key="index" :xs="12" :sm="6" :xl="3">
        <t-card :bordered="false" class="dashboard-card stat-card" hover-shadow>
          <div class="stat-content">
            <div class="stat-left">
              <div class="stat-title">{{ item.title }}</div>
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-trend">
                <t-trend :trend="item.trend === 'up' ? 'up' : 'down'" class="trend-container">
                  {{ item.trend === 'up' ? '+' : '-' }}{{ item.rate }}%
                </t-trend>
                <span class="trend-text">较上周</span>
              </div>
            </div>
            <div class="stat-icon">
              <t-icon :name="item.icon" />
            </div>
          </div>
        </t-card>
      </t-col>
    </t-row>

    <!-- 图表区域 -->
    <t-row :gutter="[16, 16]" class="dashboard-row">
      <t-col :xs="24" :lg="12">
        <t-card :bordered="false" title="销售趋势" subtitle="(近30天)" class="dashboard-card chart-card" hover-shadow>
          <div ref="salesTrendChart" class="chart-container"></div>
        </t-card>
      </t-col>
      <t-col :xs="24" :lg="12">
        <t-card :bordered="false" title="销售分布" class="dashboard-card chart-card" hover-shadow>
          <div ref="salesDistributionChart" class="chart-container"></div>
        </t-card>
      </t-col>
    </t-row>

    <!-- 任务和活动区域 -->
    <t-row :gutter="[16, 16]" class="dashboard-row">
      <t-col :xs="24" :xl="12">
        <t-card :bordered="false" title="待办任务" class="dashboard-card" hover-shadow>
          <t-list :split="true">
            <t-list-item v-for="(task, index) in taskList" :key="index">
              <template #content>
                <div class="list-item-content">
                  <div class="task-info">
                    <t-checkbox :checked="task.completed" @change="toggleTaskStatus(index)">
                      <span :class="{ 'task-completed': task.completed }">{{ task.title }}</span>
                    </t-checkbox>
                    <t-tag v-if="task.priority === 'high'" theme="danger" variant="light">紧急</t-tag>
                    <t-tag v-else-if="task.priority === 'medium'" theme="warning" variant="light">重要</t-tag>
                    <t-tag v-else theme="primary" variant="light">普通</t-tag>
                  </div>
                  <div class="task-date">{{ task.deadline }}</div>
                </div>
              </template>
            </t-list-item>
          </t-list>
          <template #footer>
            <div class="card-footer">
              <t-button theme="primary" variant="text">查看全部</t-button>
            </div>
          </template>
        </t-card>
      </t-col>
      <t-col :xs="24" :xl="12">
        <t-card :bordered="false" title="最近活动" class="dashboard-card" hover-shadow>
          <t-list :split="true">
            <t-list-item v-for="(activity, index) in activityList" :key="index">
              <template #content>
                <div class="list-item-content">
                  <div class="activity-avatar">
                    <t-avatar :image="activity.avatar" :alt="activity.user">
                      {{ activity.user.charAt(0) }}
                    </t-avatar>
                  </div>
                  <div class="activity-content">
                    <div class="activity-title">
                      <span class="activity-user">{{ activity.user }}</span>
                      <span>{{ activity.action }}</span>
                    </div>
                    <div class="activity-time">{{ activity.time }}</div>
                  </div>
                </div>
              </template>
            </t-list-item>
          </t-list>
          <template #footer>
            <div class="card-footer">
              <t-button theme="primary" variant="text">查看全部</t-button>
            </div>
          </template>
        </t-card>
      </t-col>
    </t-row>

    <!-- 项目进度区域 -->
    <t-row :gutter="[16, 16]" class="dashboard-row">
      <t-col :span="24">
        <t-card :bordered="false" title="项目进度" class="dashboard-card" hover-shadow>
          <t-table :data="projectList" :columns="projectColumns" row-key="id" :pagination="pagination" hover />
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Dashboard',
};
</script>

<script setup lang="ts">
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { onMounted, reactive, ref } from 'vue';

// 数据概览
const statisticsData = ref([
  {
    title: '总销售额',
    value: '¥ 126,560',
    trend: 'up',
    rate: '15.6',
    icon: 'money-circle',
  },
  {
    title: '访问量',
    value: '8,846',
    trend: 'up',
    rate: '6.2',
    icon: 'view-module',
  },
  {
    title: '订单量',
    value: '1,280',
    trend: 'down',
    rate: '8.4',
    icon: 'shop',
  },
  {
    title: '新增用户',
    value: '256',
    trend: 'up',
    rate: '12.3',
    icon: 'usergroup',
  },
]);

// 待办任务列表
const taskList = ref([
  {
    title: '完成仪表盘设计',
    completed: false,
    priority: 'high',
    deadline: '今天 18:00',
  },
  {
    title: '客户需求分析会议',
    completed: true,
    priority: 'medium',
    deadline: '明天 10:30',
  },
  {
    title: '准备项目周报',
    completed: false,
    priority: 'medium',
    deadline: '周五 17:00',
  },
  {
    title: '产品功能评审',
    completed: false,
    priority: 'low',
    deadline: '下周一 14:00',
  },
  {
    title: '更新项目文档',
    completed: false,
    priority: 'low',
    deadline: '下周二 16:00',
  },
]);

// 切换任务状态
const toggleTaskStatus = (index: number) => {
  taskList.value[index].completed = !taskList.value[index].completed;
};

// 最近活动列表
const activityList = ref([
  {
    user: '张三',
    action: '创建了新项目「智能家居系统」',
    time: '10分钟前',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  {
    user: '李四',
    action: '评论了项目「企业管理系统」',
    time: '1小时前',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  {
    user: '王五',
    action: '完成了任务「首页UI设计」',
    time: '2小时前',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  {
    user: '赵六',
    action: '上传了文档「产品需求说明书」',
    time: '昨天 18:30',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  {
    user: '系统',
    action: '部署了新版本 v1.2.3',
    time: '昨天 20:00',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
]);

// 项目列表
const projectList = ref([
  {
    id: 1,
    name: '企业管理系统',
    leader: '张三',
    team: ['张三', '李四', '王五'],
    progress: 75,
    status: 'progressing',
    deadline: '2023-12-31',
  },
  {
    id: 2,
    name: '智能家居平台',
    leader: '李四',
    team: ['李四', '王五'],
    progress: 36,
    status: 'progressing',
    deadline: '2023-11-20',
  },
  {
    id: 3,
    name: '数据分析工具',
    leader: '王五',
    team: ['王五', '赵六', '张三'],
    progress: 100,
    status: 'success',
    deadline: '2023-10-15',
  },
  {
    id: 4,
    name: '移动端应用',
    leader: '赵六',
    team: ['赵六', '张三'],
    progress: 0,
    status: 'pending',
    deadline: '2024-01-31',
  },
]);

// 项目表格列定义
const projectColumns = [
  {
    colKey: 'name',
    title: '项目名称',
    width: '200',
  },
  {
    colKey: 'leader',
    title: '负责人',
    width: '100',
  },
  {
    colKey: 'team',
    title: '团队成员',
    width: '200',
    cell: (h: any, { row }: any) => {
      return h(
        't-avatar-group',
        {
          cascading: 'left-up',
          max: 3,
          size: 'small',
        },
        {
          default: () =>
            row.team.map((member: string, index: number) => {
              return h('t-avatar', {
                content: member.charAt(0),
              });
            }),
        },
      );
    },
  },
  {
    colKey: 'progress',
    title: '进度',
    width: '200',
    cell: (h: any, { row }: any) => {
      let theme = 'primary';
      if (row.status === 'success') theme = 'success';
      if (row.status === 'warning') theme = 'warning';
      if (row.status === 'error') theme = 'error';

      return h('t-progress', {
        percentage: row.progress,
        theme,
      });
    },
  },
  {
    colKey: 'status',
    title: '状态',
    width: '100',
    cell: (h: any, { row }: any) => {
      const statusMap: Record<string, { theme: string; label: string }> = {
        pending: { theme: 'default', label: '未开始' },
        progressing: { theme: 'primary', label: '进行中' },
        success: { theme: 'success', label: '已完成' },
        warning: { theme: 'warning', label: '警告' },
        error: { theme: 'danger', label: '异常' },
      };
      const status = statusMap[row.status] || statusMap.pending;

      return h(
        't-tag',
        {
          theme: status.theme,
          variant: 'light',
        },
        status.label,
      );
    },
  },
  {
    colKey: 'deadline',
    title: '截止日期',
    width: '120',
  },
  {
    colKey: 'operation',
    title: '操作',
    fixed: 'right' as const,
    width: '120',
    cell: (h: any) => {
      return h(
        't-space',
        {},
        {
          default: () => [
            h('t-button', {
              theme: 'primary',
              variant: 'text',
              content: '详情',
            }),
            h('t-button', {
              theme: 'primary',
              variant: 'text',
              content: '编辑',
            }),
          ],
        },
      );
    },
  },
];

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 5,
  total: 20,
  showJumper: true,
  showPageSize: true,
  pageSizeOptions: [5, 10, 15, 20],
});

// 图表引用
const salesTrendChart = ref<HTMLElement | null>(null);
const salesDistributionChart = ref<HTMLElement | null>(null);

// 初始化图表
onMounted(() => {
  // 销售趋势图表
  if (salesTrendChart.value) {
    const chart = echarts.init(salesTrendChart.value);
    const days = Array.from({ length: 30 }, (_, i) => {
      return dayjs()
        .subtract(29 - i, 'day')
        .format('MM-DD');
    });

    const option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: days,
        axisLine: {
          lineStyle: {
            color: '#E3E6EB',
          },
        },
        axisLabel: {
          color: '#808080',
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#808080',
        },
        splitLine: {
          lineStyle: {
            color: '#E3E6EB',
          },
        },
      },
      series: [
        {
          name: '销售额',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#0052D9',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 82, 217, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(0, 82, 217, 0.1)',
              },
            ]),
          },
          data: [
            4200, 3800, 4500, 5200, 4650, 5900, 6200, 5100, 5300, 4900, 5600, 6800, 7200, 6500, 5900, 6300, 7500, 8100,
            7600, 6800, 7300, 8200, 8700, 9200, 8500, 9500, 10200, 9800, 10500, 11000,
          ],
        },
      ],
    };

    chart.setOption(option);

    // 响应窗口大小变化
    window.addEventListener('resize', () => {
      chart.resize();
    });
  }

  // 销售分布图表
  if (salesDistributionChart.value) {
    const chart = echarts.init(salesDistributionChart.value);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['电子产品', '家居用品', '服装', '食品', '其他'],
        textStyle: {
          color: '#808080',
        },
      },
      series: [
        {
          name: '销售分布',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 35, name: '电子产品' },
            { value: 25, name: '家居用品' },
            { value: 20, name: '服装' },
            { value: 15, name: '食品' },
            { value: 5, name: '其他' },
          ],
        },
      ],
    };

    chart.setOption(option);

    // 响应窗口大小变化
    window.addEventListener('resize', () => {
      chart.resize();
    });
  }
});
</script>

<style lang="less" scoped>
.dashboard-container {
  padding: 24px;
}

.dashboard-row {
  margin-top: 16px;
}

.dashboard-card {
  height: 100%;
}

// 数据概览卡片样式
.stat-card {
  overflow: hidden;
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-left {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: var(--td-text-color-secondary);
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--td-text-color-primary);
  margin-bottom: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.trend-container {
  margin-right: 4px;
}

.trend-text {
  color: var(--td-text-color-secondary);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--td-brand-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--td-brand-color);
  font-size: 24px;
}

// 图表样式
.chart-card {
  height: 100%;
}

.chart-container {
  height: 350px;
  width: 100%;
}

.pie-chart {
  height: 350px;
}

// 列表样式
.list-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 0;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-completed {
  text-decoration: line-through;
  color: var(--td-text-color-secondary);
}

.task-date {
  color: var(--td-text-color-secondary);
  font-size: 12px;
}

.activity-content {
  flex: 1;
}

.list-item-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.activity-avatar {
  flex-shrink: 0;
}

.activity-title {
  margin-bottom: 4px;
}

.activity-user {
  font-weight: 600;
  margin-right: 4px;
}

.activity-time {
  font-size: 12px;
  color: var(--td-text-color-secondary);
}

.card-footer {
  display: flex;
  justify-content: center;
}
</style>

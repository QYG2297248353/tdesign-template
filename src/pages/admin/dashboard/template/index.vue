<template>
  <div class="template-container">
    <t-card class="template-card">
      <template #header>
        <div class="template-header">
          <div class="template-title">模板页面</div>
        </div>
      </template>
      
      <!-- 骨架屏区域 -->
      <div class="skeleton-container">
        <!-- 搜索区域骨架屏 -->
        <div class="search-area">
          <t-skeleton animation="gradient" theme="text" :loading="true">
            <div class="search-form">
              <t-space>
                <t-skeleton animation="gradient" :loading="true">
                  <t-input placeholder="请输入" />
                </t-skeleton>
                <t-skeleton animation="gradient" :loading="true">
                  <t-select placeholder="请选择" />
                </t-skeleton>
                <t-skeleton animation="gradient" :loading="true">
                  <t-date-picker mode="date" />
                </t-skeleton>
                <t-skeleton animation="gradient" :loading="true">
                  <t-button theme="primary">搜索</t-button>
                </t-skeleton>
                <t-skeleton animation="gradient" :loading="true">
                  <t-button theme="default">重置</t-button>
                </t-skeleton>
              </t-space>
            </div>
          </t-skeleton>
        </div>
        
        <!-- 操作区域骨架屏 -->
        <div class="operation-area">
          <t-skeleton animation="gradient" :loading="true">
            <t-space>
              <t-button theme="primary">新建</t-button>
              <t-button theme="default">导入</t-button>
              <t-button theme="default">导出</t-button>
            </t-space>
          </t-skeleton>
        </div>
        
        <!-- 表格区域骨架屏 -->
        <div class="table-area">
          <t-skeleton animation="gradient" :loading="true">
            <t-table :data="[]" :columns="[]" bordered stripe>
              <template #topContent>
                <t-skeleton animation="gradient" theme="text" :loading="true" />
              </template>
            </t-table>
          </t-skeleton>
        </div>
        
        <!-- 分页区域骨架屏 -->
        <div class="pagination-area">
          <t-skeleton animation="gradient" :loading="true">
            <t-pagination
              :total="0"
              :page-size="10"
              :current="1"
              :page-size-options="[5, 10, 20, 50]"
              show-total
              show-jumper
              show-page-size
            />
          </t-skeleton>
        </div>
        
        <!-- 表单区域骨架屏 -->
        <div class="form-area">
          <t-skeleton animation="gradient" :loading="true">
            <t-form>
              <t-form-item label="表单项1">
                <t-input placeholder="请输入" />
              </t-form-item>
              <t-form-item label="表单项2">
                <t-select placeholder="请选择" />
              </t-form-item>
              <t-form-item label="表单项3">
                <t-date-picker mode="date" />
              </t-form-item>
              <t-form-item>
                <t-space>
                  <t-button theme="primary">提交</t-button>
                  <t-button theme="default">重置</t-button>
                </t-space>
              </t-form-item>
            </t-form>
          </t-skeleton>
        </div>
        
        <!-- 卡片列表区域骨架屏 -->
        <div class="card-list-area">
          <t-row :gutter="16">
            <t-col :span="6">
              <t-skeleton animation="gradient" :loading="true">
                <t-card title="卡片标题1" hover-shadow>
                  <template #actions>
                    <t-space>
                      <t-button variant="text">操作1</t-button>
                      <t-button variant="text">操作2</t-button>
                    </t-space>
                  </template>
                  卡片内容1
                </t-card>
              </t-skeleton>
            </t-col>
            <t-col :span="6">
              <t-skeleton animation="gradient" :loading="true">
                <t-card title="卡片标题2" hover-shadow>
                  <template #actions>
                    <t-space>
                      <t-button variant="text">操作1</t-button>
                      <t-button variant="text">操作2</t-button>
                    </t-space>
                  </template>
                  卡片内容2
                </t-card>
              </t-skeleton>
            </t-col>
            <t-col :span="6">
              <t-skeleton animation="gradient" :loading="true">
                <t-card title="卡片标题3" hover-shadow>
                  <template #actions>
                    <t-space>
                      <t-button variant="text">操作1</t-button>
                      <t-button variant="text">操作2</t-button>
                    </t-space>
                  </template>
                  卡片内容3
                </t-card>
              </t-skeleton>
            </t-col>
            <t-col :span="6">
              <t-skeleton animation="gradient" :loading="true">
                <t-card title="卡片标题4" hover-shadow>
                  <template #actions>
                    <t-space>
                      <t-button variant="text">操作1</t-button>
                      <t-button variant="text">操作2</t-button>
                    </t-space>
                  </template>
                  卡片内容4
                </t-card>
              </t-skeleton>
            </t-col>
          </t-row>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Template',
};
</script>

<script setup lang="ts">
// 这里可以添加页面逻辑
</script>

<style lang="less" scoped>
.template-container {
  padding: 0 24px;
  
  .template-card {
    margin-bottom: 24px;
  }
  
  .template-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .template-title {
    font-size: 20px;
    font-weight: 500;
  }
  
  .skeleton-container {
    > div {
      margin-bottom: 24px;
    }
  }
  
  .search-area,
  .operation-area,
  .table-area,
  .pagination-area,
  .form-area,
  .card-list-area {
    padding: 16px 0;
  }
  
  .search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .operation-area {
    display: flex;
    justify-content: flex-start;
  }
  
  .pagination-area {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

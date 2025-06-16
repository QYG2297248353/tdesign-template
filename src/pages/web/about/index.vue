<template>
  <div class="about-container">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <h1 class="page-title">关于我们</h1>
      <div class="page-divider"></div>
    </div>

    <!-- 公司简介区域 -->
    <div class="section company-section">
      <div class="section-container">
        <t-row :gutter="[24, 24]" align="middle" justify="center">
          <t-col :xs="24" :md="12">
            <div class="company-image">
              <img
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="公司简介"
              />
            </div>
          </t-col>
          <t-col :xs="24" :md="12">
            <div class="company-content">
              <h2 class="section-title">公司简介</h2>
              <p class="company-desc">
                新疆萌森软件开发工作室成立于2023年4月28日，是一家专注于软件开发和信息技术服务的个人独资企业。我们致力于为客户提供高质量的软件开发、网络技术服务和信息技术咨询服务。
              </p>
              <p class="company-desc">
                我们的业务范围包括软件开发、网络技术服务、信息技术咨询服务、人工智能应用软件开发、区块链技术相关软件和服务以及互联网销售等。
              </p>
              <div class="company-info">
                <div class="info-item">
                  <t-icon name="user" />
                  <span>新疆萌森软件开发工作室</span>
                </div>
                <div class="info-item">
                  <t-icon name="calendar" />
                  <span>成立日期：2023-04-28</span>
                </div>
                <div class="info-item">
                  <t-icon name="chart-bubble" />
                  <span>企业类型：个人独资企业</span>
                </div>
              </div>
            </div>
          </t-col>
        </t-row>
      </div>
    </div>

    <!-- 企业理念区域 -->
    <div class="section vision-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">企业理念</h2>
          <p class="section-desc">创新、专业、诚信、共赢</p>
        </div>
        <t-row :gutter="[24, 24]" justify="center">
          <t-col :xs="24" :sm="12" :md="6">
            <t-card :bordered="false" hover-shadow class="vision-card">
              <template #avatar>
                <t-avatar size="large" class="vision-avatar">
                  <template #icon>
                    <t-icon name="lightbulb" />
                  </template>
                </t-avatar>
              </template>
              <template #title>
                <h3>创新驱动</h3>
              </template>
              <p>不断探索新技术，追求创新突破，为客户提供前沿的软件解决方案</p>
            </t-card>
          </t-col>
          <t-col :xs="24" :sm="12" :md="6">
            <t-card :bordered="false" hover-shadow class="vision-card">
              <template #avatar>
                <t-avatar size="large" class="vision-avatar">
                  <template #icon>
                    <t-icon name="precise-monitor" />
                  </template>
                </t-avatar>
              </template>
              <template #title>
                <h3>专业品质</h3>
              </template>
              <p>专注技术研发，精益求精，确保每一个项目都达到专业水准</p>
            </t-card>
          </t-col>
          <t-col :xs="24" :sm="12" :md="6">
            <t-card :bordered="false" hover-shadow class="vision-card">
              <template #avatar>
                <t-avatar size="large" class="vision-avatar">
                  <template #icon>
                    <t-icon name="secured" />
                  </template>
                </t-avatar>
              </template>
              <template #title>
                <h3>诚信为本</h3>
              </template>
              <p>诚实守信，透明合作，与客户建立长期稳定的合作关系</p>
            </t-card>
          </t-col>
          <t-col :xs="24" :sm="12" :md="6">
            <t-card :bordered="false" hover-shadow class="vision-card">
              <template #avatar>
                <t-avatar size="large" class="vision-avatar">
                  <template #icon>
                    <t-icon name="chart-bubble" />
                  </template>
                </t-avatar>
              </template>
              <template #title>
                <h3>合作共赢</h3>
              </template>
              <p>注重客户价值，追求互利共赢，共同成长</p>
            </t-card>
          </t-col>
        </t-row>
      </div>
    </div>

    <!-- 业务范围区域 -->
    <div class="section business-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">业务范围</h2>
          <p class="section-desc">为您提供全方位的软件开发和信息技术服务</p>
        </div>
        <t-row :gutter="[24, 24]" justify="center">
          <t-col :xs="24" :sm="12" :md="8">
            <t-card :bordered="false" hover-shadow class="business-card">
              <template #cover>
                <div class="business-image">
                  <img
                    src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="软件开发"
                  />
                </div>
              </template>
              <template #title>
                <h3>软件开发</h3>
              </template>
              <p>提供定制化软件开发服务，包括桌面应用、移动应用和Web应用等</p>
            </t-card>
          </t-col>
          <t-col :xs="24" :sm="12" :md="8">
            <t-card :bordered="false" hover-shadow class="business-card">
              <template #cover>
                <div class="business-image">
                  <img
                    src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="人工智能"
                  />
                </div>
              </template>
              <template #title>
                <h3>人工智能应用</h3>
              </template>
              <p>开发基于人工智能的应用软件，为企业提供智能化解决方案</p>
            </t-card>
          </t-col>
          <t-col :xs="24" :sm="12" :md="8">
            <t-card :bordered="false" hover-shadow class="business-card">
              <template #cover>
                <div class="business-image">
                  <img
                    src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="区块链技术"
                  />
                </div>
              </template>
              <template #title>
                <h3>区块链技术</h3>
              </template>
              <p>提供区块链相关软件和服务，助力企业数字化转型</p>
            </t-card>
          </t-col>
        </t-row>
      </div>
    </div>

    <!-- 联系我们区域 -->
    <div class="section contact-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">联系我们</h2>
          <p class="section-desc">随时为您提供帮助和支持</p>
        </div>
        <t-row :gutter="[24, 24]" justify="center">
          <t-col :xs="24" :sm="8">
            <t-card :bordered="false" hover-shadow class="contact-card">
              <div class="contact-card-content">
                <t-avatar class="contact-avatar">
                  <template #icon>
                    <t-icon name="mail" />
                  </template>
                </t-avatar>
                <h3 class="contact-title">邮箱</h3>
                <div class="contact-info">
                  <p>blog@lifebus.top</p>
                </div>
              </div>
            </t-card>
          </t-col>
        </t-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'About',
};
</script>

<script setup lang="ts"></script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  text-align: center;
  margin: 60px 0;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--td-text-color-primary);
  margin-bottom: 20px;
}

.page-divider {
  width: 80px;
  height: 4px;
  background-color: var(--td-brand-color);
  margin: 0 auto;
}

.section {
  margin: 80px 0;
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--td-text-color-primary);
}

.section-desc {
  font-size: 18px;
  color: var(--td-text-color-secondary);
  max-width: 700px;
  margin: 0 auto;
}

// 公司简介样式
.company-section {
  background-color: var(--td-bg-color-container-hover);
  padding: 80px 0;
  border-radius: 12px;
}

.company-image {
  text-align: center;
  overflow: hidden;
  border-radius: 12px;

  img {
    max-width: 100%;
    height: auto;
    transition: transform 0.5s;

    &:hover {
      transform: scale(1.03);
    }
  }
}

.company-content {
  padding: 0 24px;
}

.company-desc {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--td-text-color-secondary);
}

.company-info {
  margin-top: 30px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 16px;

  .t-icon {
    margin-right: 10px;
    color: var(--td-brand-color);
  }
}

// 企业理念样式
.vision-card {
  height: 100%;
  transition: transform 0.3s;
  padding: 16px;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
  }
}

.vision-avatar {
  background-color: var(--td-brand-color-light);
  margin-bottom: 16px;
}

// 业务范围样式
.business-section {
  background-color: var(--td-bg-color-container-hover);
  padding: 80px 0;
  border-radius: 12px;
}

.business-card {
  height: 100%;
  transition: transform 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
  }
}

.business-image {
  height: 220px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

// 联系我们样式
.contact-card {
  height: 100%;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-8px);
  }
}

.contact-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
}

.contact-avatar {
  background-color: var(--td-brand-color-light);
  margin-bottom: 16px;
}

.contact-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--td-text-color-primary);
}

.contact-info {
  margin-top: 16px;
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 992px) {
  .section {
    margin: 60px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .company-section,
  .business-section {
    padding: 60px 0;
  }

  .page-header {
    margin: 50px 0;
  }

  .page-title {
    font-size: 42px;
  }
}

@media (max-width: 768px) {
  .section {
    margin: 50px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-desc {
    font-size: 16px;
  }

  .company-section,
  .business-section {
    padding: 50px 0;
  }

  .company-content {
    padding: 24px 0 0 0;
    text-align: center;
  }

  .info-item {
    justify-content: center;
  }

  .page-header {
    margin: 40px 0;
  }

  .page-title {
    font-size: 36px;
  }
}

@media (max-width: 576px) {
  .section {
    margin: 40px 0;
  }

  .section-header {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: 24px;
  }

  .company-section,
  .business-section {
    padding: 40px 0;
  }

  .page-header {
    margin: 30px 0;
  }

  .page-title {
    font-size: 32px;
  }
}
</style>

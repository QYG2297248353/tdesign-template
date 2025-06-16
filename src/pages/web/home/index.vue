<template>
  <div class="home-container">
    <!-- 轮播图区域 -->
    <div class="banner-section">
      <t-swiper :autoplay="true" :duration="3000" :interval="3000" :navigation="{ showSlideBtn: 'hover' }">
        <t-swiper-item v-for="(item, index) in bannerList" :key="index">
          <div class="banner-item" :style="{ backgroundImage: `url(${item.image})` }">
            <div class="banner-content">
              <h2 class="banner-title">{{ item.title }}</h2>
              <p class="banner-desc">{{ item.description }}</p>
              <t-button theme="primary" class="banner-btn">了解更多</t-button>
            </div>
          </div>
        </t-swiper-item>
      </t-swiper>
    </div>

    <!-- 产品特性区域 -->
    <div class="section feature-section">
      <div class="section-header">
        <h2 class="section-title">产品特性</h2>
        <p class="section-desc">我们提供最优质的产品和服务</p>
      </div>
      <t-row :gutter="[24, 24]" justify="center">
        <t-col v-for="(feature, index) in featureList" :key="index" :xs="12" :sm="8" :md="6">
          <t-card :bordered="false" hover-shadow class="feature-card">
            <template #avatar>
              <t-avatar size="large" class="feature-avatar">
                <template #icon>
                  <t-icon :name="feature.icon" />
                </template>
              </t-avatar>
            </template>
            <template #title>
              <h3>{{ feature.title }}</h3>
            </template>
            <p>{{ feature.description }}</p>
          </t-card>
        </t-col>
      </t-row>
    </div>

    <!-- 产品展示区域 -->
    <div class="section product-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">产品展示</h2>
          <p class="section-desc">精选优质产品，满足您的各种需求</p>
        </div>
        <t-row :gutter="[24, 24]" justify="center">
          <t-col v-for="(product, index) in productList" :key="index" :xs="24" :sm="12" :md="8">
            <t-card :bordered="false" hover-shadow class="product-card">
              <template #cover>
                <div class="product-image">
                  <img :src="product.image" :alt="product.name" />
                </div>
              </template>
              <template #title>
                <h3>{{ product.name }}</h3>
              </template>
              <template #description>
                <p>{{ product.description }}</p>
              </template>
              <template #footer>
                <div class="product-footer">
                  <span class="product-price">¥{{ product.price }}</span>
                  <t-button theme="primary" variant="outline" size="small">查看详情</t-button>
                </div>
              </template>
            </t-card>
          </t-col>
        </t-row>
      </div>
    </div>

    <!-- 关于我们区域 -->
    <div class="section about-section">
      <div class="section-container">
        <t-row :gutter="[24, 24]" align="middle" justify="center">
          <t-col :xs="24" :md="12">
            <div class="about-content">
              <h2 class="section-title">关于我们</h2>
              <p class="about-desc">
                我们是一家专注于提供高质量产品和服务的公司。多年以来，我们始终坚持以客户为中心，不断创新，追求卓越。
              </p>
              <p class="about-desc">
                我们的团队由一群充满激情和创造力的专业人士组成，他们致力于为客户提供最佳的解决方案和体验。
              </p>
              <t-button theme="primary" class="about-btn">了解更多</t-button>
            </div>
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
  name: 'Home',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

// 轮播图数据
const bannerList = ref([
  {
    title: '创新科技，改变生活',
    description: '探索前沿科技，体验智能生活',
    image:
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: '品质服务，用心呈现',
    description: '专业团队，为您提供一流的服务体验',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: '精益求精，追求卓越',
    description: '不断创新，持续提升产品品质',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
]);

// 产品特性数据
const featureList = ref([
  {
    title: '高效便捷',
    description: '提供高效的解决方案，让您的工作更加便捷',
    icon: 'chart-bubble',
  },
  {
    title: '安全可靠',
    description: '采用先进的安全技术，保障您的数据安全',
    icon: 'secured',
  },
  {
    title: '智能分析',
    description: '智能数据分析，助您做出更明智的决策',
    icon: 'chart',
  },
  {
    title: '全天候服务',
    description: '24小时客户服务，随时为您解答疑问',
    icon: 'service',
  },
]);

// 产品展示数据
const productList = ref([
  {
    name: '智能家居套装',
    price: '1999',
    description: '打造智能生活空间，让家更懂你',
    image:
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: '商业数据分析系统',
    price: '5999',
    description: '深度挖掘数据价值，助力企业决策',
    image:
      'https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: '企业安全解决方案',
    price: '3999',
    description: '全方位保障企业信息安全',
    image:
      'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
]);
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
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

// 轮播图样式
.banner-section {
  margin-bottom: 80px;
}

.banner-item {
  height: 550px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
}

.banner-content {
  max-width: 600px;
  padding: 0 60px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.banner-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
}

.banner-desc {
  font-size: 20px;
  margin-bottom: 30px;
}

.banner-btn {
  font-size: 16px;
  padding: 8px 24px;
}

// 产品特性样式
.feature-card {
  height: 100%;
  transition: transform 0.3s;
  padding: 16px;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
  }
}

.feature-avatar {
  background-color: var(--td-brand-color-light);
  margin-bottom: 16px;
}

// 产品展示样式
.product-section {
  background-color: var(--td-bg-color-container-hover);
  padding: 80px 0;
  border-radius: 12px;
  margin: 100px 0;
}

.product-card {
  height: 100%;
  transition: transform 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
  }
}

.product-image {
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

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.product-price {
  color: var(--td-error-color);
  font-weight: 600;
  font-size: 20px;
}

// 关于我们样式
.about-section {
  background-color: var(--td-bg-color-container-hover);
  padding: 80px 0;
  border-radius: 12px;
}

.about-image {
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

.about-content {
  padding: 0 24px;
}

.about-desc {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--td-text-color-secondary);
}

.about-btn {
  margin-top: 24px;
  padding: 8px 24px;
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

  .product-section,
  .about-section {
    padding: 60px 0;
    margin: 80px 0;
  }
}

@media (max-width: 768px) {
  .banner-item {
    height: 400px;
  }

  .banner-content {
    padding: 0 30px;
  }

  .banner-title {
    font-size: 36px;
  }

  .banner-desc {
    font-size: 18px;
  }

  .section {
    margin: 50px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-desc {
    font-size: 16px;
  }

  .about-section,
  .product-section {
    padding: 50px 0;
    margin: 60px 0;
  }

  .about-content {
    padding: 24px 0 0 0;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .banner-item {
    height: 300px;
  }

  .banner-title {
    font-size: 28px;
  }

  .banner-desc {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .section {
    margin: 40px 0;
  }

  .section-header {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: 24px;
  }

  .about-section,
  .product-section {
    padding: 40px 0;
    margin: 50px 0;
  }
}
</style>

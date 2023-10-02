<template>
  <div class="login">
    <div class="content">
      <div class="action-box">
        <t-form class="action-box__form" ref="form" :data="formData" :colon="true" :label-width="60" label-align="top"
          @reset="onReset" @submit="onSubmit">
          <t-form-item label="用户名" name="account">
            <t-input v-model="formData.account" placeholder="请输入账户名">
              <template #prefix-icon>
                <mail-icon />
              </template>
            </t-input>
          </t-form-item>

          <t-form-item label="密码" name="password">
            <t-input v-model="formData.password" type="password" placeholder="请输入密码">
              <template #prefix-icon>
                <lock-on-icon />
              </template>
            </t-input>
          </t-form-item>

          <t-form-item class="login-btn-item">
            <t-button theme="default" type="submit" variant="outline" block>登录</t-button>
          </t-form-item>
        </t-form>
      </div>
      <div class="bg">
        <div class="left"></div>
        <div class="right">
          <div class="title">
          <span>
            福辰AI 科技
          </span>
          <span>
            专为电商而生
          </span>
        </div>
        <div class="logo">
          <img :src="logoImg" alt="">
        </div>
        <div class="register">
          <p>没有账号？</p>
          <t-button theme="default" variant="outline">去注册</t-button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { MailIcon, LockOnIcon } from 'tdesign-icons-vue-next';

import { getAssetsUrl } from '@/utils/getUrl';

const logoImg = getAssetsUrl("img/logo.png")

const formData = reactive({
  account: '',
  password: '',
});

const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: #E8DCFD;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 652px;
    height: 448px;
    position: relative;
    display: flex;
    align-items: center;

  }
}

.action-box {
  position: absolute;
  left: 33px;
  width: 329px;
  height: 100%;
  background-color: #9E81BE;
  border-radius: 5px;

  &__form {
    width: 248px;
    height: 277px;
    margin: 83px auto 0;

    :deep(.t-form__item) {
      .t-form__label {
        color: #CCBEE3;
      }

      .t-form__controls {
        .t-input {
          border: none;
          border-bottom: 1px solid #CCBEE3;
          background-color: transparent;
          box-shadow: none;

          &:hover {
            border-color: #CCBEE3;
          }

          &:focus {
            box-shadow: none !important;
          }

          .t-input__prefix>.t-icon {
            color: #CCBEE3;
          }

          .t-input__inner {
            color: #FFFFFF;

            &::placeholder {
              color: #CCBEE3;
            }
          }
        }
      }

    }

    // 
    .login-btn-item {
      margin: 81px 0 0 0 !important;

      .t-button {
        height: 40px;
        width: 201px;
        color: #9E81BE;
        background-color: #FFFFFF;
        margin: 0 auto;
        border: none;
        border-radius: 5px;
      }
    }

  }

}

.bg {
  width: 652px;
  height: 361px;
  background-color: #FFFFFF;
  border-radius: 12.63px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
  display: flex;

  .left{
    width: 362px;
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 29px 0 0 0;
  }

  .title {
    font-size: 20px;
    font-weight: bold;

    span{
      &:first-child{
        color: #745F9A;
      }
      &:last-child{
        color: #9E81BE;
      }
    }
  }
  .logo{
    width: 150px;
    height: 150px;
    margin: 30px 0 0;
  }
  .register{
    margin: 24px 0 0;
    color: #9E81BE;

    .t-button{
      margin: 10px 0 0;
      color: #9E81BE;
      border-color: #9E81BE;
      border-radius: 5px;
    }
  }
}
</style>
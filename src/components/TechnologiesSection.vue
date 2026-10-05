<script setup lang="ts">
import FlexDiv from '@/common/FlexDiv.vue'
import CartDiv from '@/common/CartDiv.vue'
import ColorEffectText from '@/common/ColorEffectText.vue'
import reactUrl from '@/assets/icons/react.png'
import vueUrl from '@/assets/icons/vue.png'
import netUrl from '@/assets/icons/net.png'
import azureUrl from '@/assets/icons/azure.png'
import redisUrl from '@/assets/icons/redis.png'
import dockerUrl from '@/assets/icons/docker.png'
import elasticUrl from '@/assets/icons/elastic.png'
import mongoUrl from '@/assets/icons/mongo.png'
import oracleUrl from '@/assets/icons/oracle.png'
import rabbitUrl from '@/assets/icons/rabbit.png'
import sqlServerUrl from '@/assets/icons/sqlserver.png'
import windowsUrl from '@/assets/icons/windows.png'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <ColorEffectText style="text-align: center; margin: 5rem">{{
    t('technologies.expertiseTitle')
  }}</ColorEffectText>
  <FlexDiv>
    <button class="primary-button tile">{{ t('technologies.domains.appDevelopment') }}</button>
    <button class="primary-button tile">{{ t('technologies.domains.uiUx') }}</button>
    <button class="primary-button tile">{{ t('technologies.domains.mobile') }}</button>
    <button class="primary-button tile">{{ t('technologies.domains.qa') }}</button>
  </FlexDiv>
  <FlexDiv>
    <button class="secondary-button tile">{{ t('technologies.domains.agile') }}</button>
    <button class="secondary-button tile">{{ t('technologies.domains.devops') }}</button>
    <button class="secondary-button tile">{{ t('technologies.domains.consulting') }}</button>
    <button class="secondary-button tile">{{ t('technologies.domains.businessAnalysis') }}</button>
  </FlexDiv>
  <ColorEffectText style="text-align: center; margin: 5rem">{{
    t('technologies.stackTitle')
  }}</ColorEffectText>
  <FlexDiv>
    <CartDiv><img :src="netUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="reactUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="vueUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="dockerUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="azureUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="windowsUrl" alt="logo" width="100px" /></CartDiv>
  </FlexDiv>
  <FlexDiv>
    <CartDiv><img :src="elasticUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="rabbitUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="sqlServerUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="oracleUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="mongoUrl" alt="logo" width="100px" /></CartDiv>
    <CartDiv><img :src="redisUrl" alt="logo" width="100px" /></CartDiv>
  </FlexDiv>
</template>

<style scoped>
.tile {
  width: 25%;
  align-items: center;
  padding: 1rem;
  box-shadow: none;
  cursor: pointer;
  border: none;
}
</style>

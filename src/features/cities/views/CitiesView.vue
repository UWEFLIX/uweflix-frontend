<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
</script>

<template>
  <DashboardLayout>
    <template #breadcrumbs>
      <Breadcrumb title="Cities" icon="bi-building" />
    </template>

    <div>Hello</div>
  </DashboardLayout>
</template>
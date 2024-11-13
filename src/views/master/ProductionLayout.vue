<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <BaseTable
          :download-menu="true"
          :action-table="true"
          :add-menu="true"
          :page-size="5"
          table-title="User Account Control"
          :show-page-size="false"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <BaseTable
          :download-menu="true"
          :action-table="true"
          table-title="User Account Control"
          :page-size="5"
          :show-page-size="false"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 16 }">
        <BaseTable
          :download-menu="true"
          :action-table="true"
          table-title="User Account Control"
          :page-size="5"
          :show-page-size="false"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
        <BaseTable
          :download-menu="true"
          :action-table="true"
          table-title="User Account Control"
          :page-size="5"
          :show-page-size="false"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import BaseTable from '@/components/BaseTable.vue'
</script>

<style scoped></style>

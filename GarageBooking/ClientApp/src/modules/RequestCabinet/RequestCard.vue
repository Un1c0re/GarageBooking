<template>
  <el-card class="w-[40em]">
    <template #header>
      <div class="flex justify-between">
        <el-tag size="large" type="info">Заявка 001101010</el-tag>
        <el-tag size="large" type="success">Оплачено</el-tag>
      </div>
    </template>
    <div class="grid grid-cols-[min-content_1fr] gap-x-6 gap-y-1">
      <span>Название</span>
      <span class="font-semibold">Репетиция психея</span>

      <span>Автор</span>
      <span class="font-semibold">Космоговно17</span>

      <span>Время</span>
      <span class="font-semibold">19:00 - 20:30</span>
    </div>
    <template #footer>
      <div class="flex w-full items-center justify-start gap-2">
        <el-button type="primary">Принять</el-button>
        <el-button type="danger">Отклонить</el-button>
      </div>
    </template>
  </el-card>
</template>

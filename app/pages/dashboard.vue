<script lang="ts" setup>
const isSidebarOpen = ref(false);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div
        class="flex"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
        @click="toggleSidebar"
      >
        <div class="flex items-center justify-center cursor-pointer hover:bg-base-300 rounded-lg size-8">
          <Icon
            v-if="isSidebarOpen"
            name="tabler:chevron-left"
            size="42"
          />
          <Icon
            v-else
            name="tabler:chevron-right"
            size="42"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <SidebarButton
          label="Locations"
          icon="tabler:map"
          href="/dashboard"
          :show-label="isSidebarOpen"
        />
        <SidebarButton
          label="Add Location"
          icon="tabler:circle-plus-filled"
          href="/dashboard/add"
          :show-label="isSidebarOpen"
        />
        <div class="divider" />
        <SidebarButton
          label="Sign Out"
          icon="tabler:logout-2"
          href="/sign-out"
          :show-label="isSidebarOpen"
        />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { label, icon, href, showLabel } = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div class="tooltip tooltip-right" :data-tip="showLabel ? undefined : label">
    <NuxtLink
      :to="href"
      :class="{ 'bg-base-300': route.path === href, 'justify-start': showLabel, 'justify-center': !showLabel }"
      class="flex gap-2 px-4 py-2 hover:bg-base-300 hover:cursor-pointer my-1 flex-nowrap"
    >
      <Icon :name="icon" size="24" />
      <Transition name="grow">
        <span v-if="showLabel">
          {{ label }}
        </span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.1s;
}

.grow-leave-active {
  animation: grow 0.1s reverse;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>

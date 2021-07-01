<template>
  <ion-app>
    <router-view />
  </ion-app>
</template>

<style>
.max-width-sm {
  max-width: 576px;
}

.max-width-md {
  max-width: 768px;
}

.max-width-lg {
  max-width: 992px;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Edge, Opera and Firefox */
}
</style>

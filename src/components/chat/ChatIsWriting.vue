<template>
  <div class="writer-status">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .writer-status {
    position: relative;
    top: -1rem;
    font-size: 1.2rem;
    padding: 0 10px;

    &::after {
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      -webkit-animation: ellipsis steps(4,end) 2000ms infinite;      
      animation: ellipsis steps(4,end) 2000ms infinite;
      content: "\2026"; /* ascii code for the ellipsis character */
      width: 0px;
    }
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;    
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 1.25em;    
    }
  }
</style>
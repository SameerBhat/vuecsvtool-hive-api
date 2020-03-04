<template>
  <div class="footer">
    <div class="form-check" v-for="(item, index) in this.firstRowTitles" :key="item">
      <input
        class="form-check-input"
        type="checkbox" 
        v-model="columnVisibilityMap[index]"
      />
      <label class="form-check-label" :for="item">
        {{item}}
      </label>
    </div>
  </div>
</template>
<style lang="scss">
.footer {

  background: black;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 3px  5px; 

    & .form-check{
        display: inline-block;
        margin: 2px;
    }

}
</style>
<script>
export default {
  props: ["firstRowTitles","columnVisibilityMap"],
  data() {
    return {
      // contextMenuArray: [...this.firstRowTitles]
    };
  },
  methods:{
      
  }
};
</script>

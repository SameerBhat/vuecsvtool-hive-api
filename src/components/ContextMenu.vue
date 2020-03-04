<template>
  <nav id="context-menu" class="context-menu" ref="context-menu">
    <input type="hidden" ref="selectedRow" value="-1" id="selectedRow" />

    <input type="hidden" ref="speakerColSelected" value="false" id="speakerColSelected" />

    <ul class="context-menu__items">
      <li
        :class="{
          'context-menu__item': true,
          'context-menu__item-multiple': isMultipleDropdown(mainMenuItem)
        }"
        v-for="(mainMenuItem, index) in contextMenuArray"
        :key="index"
        v-show="shouldShow(index)">
        <a
          href="#"
          class="context-menu__link"
          @click="handleContextClick(mainMenuItem)"
          >{{ mainMenuItem }}
        </a>

        <!-- //START -->

        <ul
          class="context-menu__items context-menu__subitem context-menu-parent"
          v-if="isTopicDropdown(mainMenuItem)"
        >
          <li
            class="context-menu__sub-item context-menu__sub-item-multiple context-menu__sub-item-topic"
            v-for="(topicPropertyValue, topicPropertyName) in contextMenuDropdownArrays['topic']"
            :key="topicPropertyName"
          >
            <a href="#" class="context-menu__link">
              {{ topicPropertyName }} &rarr; 
            </a>

             <ul class="context-menu__items context-menu__sub-subitem">
              
               <li
            class="context-menu__sub-item"
            v-for="topicSubItemValue in topicPropertyValue"
              :key="topicSubItemValue">
            <a href="#" class="context-menu__link"
            @click="handleDropdownClick(mainMenuItem, topicSubItemValue)">
              {{ topicSubItemValue }} 
            </a>
               </li>
            </ul>

           
          
          </li>
        </ul>

        <ul
          class="context-menu__items context-menu__subitem"
          v-if="isPromiseDropdown(mainMenuItem)"
        >
          <li
            class="context-menu__sub-item context-menu__sub-item-multiple"
            v-for="promiseSubItem in contextMenuDropdownArrays['promise']"
            :key="promiseSubItem"
          >
            <a
              href="#"
              class="context-menu__link"
              @click="handleDropdownClick(mainMenuItem, promiseSubItem)"
            >
              {{ promiseSubItem }}
            </a>
          </li>
        </ul>
        <!-- END -->
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.context-menu {
  display: none;
  position: absolute;
  z-index: 9999;
  padding: 12px 0;
  width: 240px;
  background-color: #fff;
  border: solid 1px #dfdfdf;
  box-shadow: 1px 1px 2px #cfcfcf;

  &--active {
    display: block;
  }

  & &__items {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: block;
    margin-bottom: 4px;

    &-multiple:hover .context-menu__subitem {
      display: block !important;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__link {
    display: block;
    padding: 4px 12px;
    color: #0066aa;
    text-decoration: none;

    &:hover {
      color: #fff;
      background-color: #0066aa;
    }
  }

  &__subitem,
  &__sub-subitem {
    display: none;
    position: absolute;
    right: 0;
    transform: translateX(100%);
    background: white;
    top: 0;
    list-style: none;
  }
}

.context-menu__item-multiple > a::after {
  content: "\2192";
}

.context-menu__sub-item-multiple:hover .context-menu__sub-subitem {
  display: block !important;
}
.context-menu__item-multiple {
  position: relative;
}

.context-menu__sub-item-topic{
      position: relative;
}
</style>

<script>

import { clipboard } from './mixins/clipboard';

export default {
  
  props: ["firstRowTitles","isSpeakerSelected","paragraphColumn","speakerColumn","contextMenuDropdownArrays"],
  mixins: [clipboard],
  data() {
    return {
      contextMenuArray: [...this.firstRowTitles],
     
      taskItemParagraphClassName: "col"+this.paragraphColumn,
      taskItemSpeakerClassName: "col"+this.speakerColumn,
    };
  },
  mounted() {
    this.contextMenuArray.push("Both", "Neither");
    this.contextMenuArray.splice(0, this.paragraphColumn + 2);
    
    this.initializeClipboard(this.$refs["context-menu"]);
  

  },
  computed: {},
  methods: {
    shouldShow(index){

      var indexOfSecondLastCol = this.contextMenuArray.length - 4;
    
        if(this.isSpeakerSelected){
            if(index>=indexOfSecondLastCol){
              return true;
            }else{
              return false;
            }
        }else{

          if(index<indexOfSecondLastCol){
        return true;
          }else{
            return false;
          }
        
        }

    },

    handleDropdownClick(mainMenuItem, topicSubItem) {

      
      const col = this.firstRowTitles.indexOf(mainMenuItem);
      const row = this.$refs["selectedRow"].value;

      this.$emit("send-result-values", {
        row: row,
        col: col,
        text: topicSubItem
      });
      
     
    },
    isMultipleDropdown(item) {
      if (
        item == "TOPIC1" ||
        item == "TOPIC2" ||
        item == "promise1" ||
        item == "promise2" ||
        item == "agent" ||
        item == "customer"
      ) {
        return true;
      } else {
        return false;
      }
    },
    isTopicDropdown(item) {
      return item.substring(0, item.length - 1).toLowerCase() == "topic"
        ? true
        : false;
    },
    isPromiseDropdown(item) {
      return item.substring(0, item.length - 1).toLowerCase() == "promise"
        ? true
        : false;
    },
    handleContextClick(item) {
      
      var col = this.firstRowTitles.indexOf(item);
      var selectedText = this.getSelectionText();
       
      if(col== -1){
        if(item === "Both" || item === "Neither"){
          col = this.firstRowTitles.indexOf("agent");
          selectedText = item;
        }
      }
      const row = this.$refs["selectedRow"].value;
      this.$emit("send-result-values", {
        row: row,
        col: col,
        text: selectedText
      });
    },
    getSelectionText() {
      var text = "";
      if (window.getSelection) {
        text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
      }
      return text;
    }
  }
};
</script>

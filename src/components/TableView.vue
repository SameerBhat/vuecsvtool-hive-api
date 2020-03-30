<template>
  <div>
  
    <table id="newTable" class="table table-hover my-3">
      <tbody>
        <tr id="tableHead">
          <td
            :class="'col' + col"
            v-for="(firstRowTitle, col) in firstRowTitles"
            :key="'header-col-' + col"
            :ref="'col' + col"
            v-show="columVisibilityMap[col]"
          >
            <b> {{ firstRowTitle }} </b>
          </td>
        </tr>

        <tr
          v-for="(csvDataRows, row) in csvDataArray"
          :key="'table-row-' + row"
          v-if="row >= startIndex && row < endIndex"
          :class="{greenBackground : isSpeaker1(row)}"
        >
          <td
            v-for="(csvDataCols, col) in csvDataRows"
            :key="'table-row-' + row + '-col-' + col"
            v-show="columVisibilityMap[col]"
          >
            <textarea
              :data-row="row"
              :data-col="col"
              :ref="'col' + col"
              v-if="
                (col == paragraphColumn + 1 && row == 0) ||
                  (col == cpnColumn && row == 0)
              "
              v-model.lazy="csvDataArray[row][col]"
              :rows="getTextAreaRows(col, csvDataCols)"
              :cols="getTextAreaCols(col, csvDataCols)"
              :readonly="col < readOnlyColumnsLength"
              :class="'col' + col"
              v-custom="{
                col: col,
                annonCol: paragraphColumn + 1,
                cpnCol: cpnColumn,
                eventBus: eventBus
              }"
              @contextmenu="selectSpeakerActive($event, col)"
            >
            </textarea>

            <textarea
              v-else
              :data-row="row"
              :data-col="col"
              :ref="'col' + col"
              v-model.lazy="csvDataArray[row][col]"
              :rows="getTextAreaRows(col, csvDataCols)"
              :cols="getTextAreaCols(col, csvDataCols)"
              :readonly="col < readOnlyColumnsLength"
              :class="'col' + col"
              @contextmenu="selectSpeakerActive($event, col)"
            >
            </textarea>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="circular-button-fab-download show-after-upload"
      @click="pushDataToServer"
      :disabled="loadingServer"
    >
    <span class="spinner-border spinner-border-sm" v-if="loadingServer" role="status" aria-hidden="true"></span>
      <span v-if="!loadingServer"> &uarr; </span>
    </div>

    <!-- fab -->
    <div
      :class="{ active: isPaginationActive }"
      class="circular-button-fab-paginate show-after-upload"
      v-if="showPaginationBar()">
    
      <label
        for="togglePagination"
        class="togglePaginationLabel"
        v-html="isPaginationActive ? 'p' : 'pp'"
      ></label>
      <input
        type="checkbox"
        class="custom-control-input"
        id="togglePagination"
        v-model="isPaginationActive"
        @change="onPaginationToggle"
      />
    </div>
<div v-if="showPaginationBar() && this.isPaginationActive">
    <div
      class="custom-control custom-switch"
      style="display: inline-block;margin: 18px;">
      <input
        type="checkbox"
        class="custom-control-input"
        id="togglePagination"
        v-model="isPaginationActive"
        @change="onPaginationToggle"
      />
      <label class="custom-control-label " for="togglePagination"
        >Toggle Pagination</label
      >
    </div>
    <div class="pagination-wrapper" style="display: flex;justify-content: flex-start;" >
      <div class="form-group" style="margin: 0px 20px;">
        <label for="per-page">Per Page</label>
        <select
          class="custom-select"
          id="per-page"
          v-model.number="perPage"
          @change="onChangePerPage"
          style="width: 92px;margin-left: 10px;"
        >
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
        </select>
      </div>

      <nav v-if="showPaginationBar()">
        <ul class="pagination" style="justify-content: center;">
          <li :class="{ disabled: !(this.currentPage > 1) }" class="page-item">
            <a class="page-link" href="#" @click="onPreviousPage($event)"
              >Previous</a
            >
          </li>
          <span style="display: flex;">
            <li
              class="page-item"
              :class="{ active: n == currentPage }"
              v-for="n in totalPages"
              :key="n"
            >
              <a class="page-link" href="#" @click="onPageNumber($event, n)">{{
                n
              }}</a>
            </li>
          </span>
          <li
            :class="{ disabled: !(this.currentPage < this.totalPages) }"
            class="page-item"
          >
            <a class="page-link" href="#" @click="onNextPage($event)">Next</a>
          </li>
        </ul>
      </nav>
      <span style="padding: 10px;margin-left: 10px; margin-bottom:20px;">
        Total Rows: {{ totalRows }}</span
      >
    </div>

    </div>

    <br />
    <br />
    <TableFooter
      :first-row-titles="firstRowTitles"
      :column-visibility-map="columVisibilityMap"
      :key="footerKey"
    />
    <ContextMenu
      :first-row-titles="firstRowTitles"
      @send-result-values="handleSelectedText"
      :is-speaker-selected="isSpeakerSelected"
      :paragraph-column="paragraphColumn"
      :speaker-column="speakerColumn"
      :context-menu-dropdown-arrays="contextMenuDropdownArrays"
    />
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu";
import TableFooter from "./TableFooter";
import { bus } from "../main";
import axios from 'axios';
export default {
  components: {
    ContextMenu,
    TableFooter
  },

  props: [
    "csvDataArray",
    "fileName",
    "firstRowTitles",
    "columVisibilityMap",
    "readOnlyColumnsLength",
    "contextMenuDropdownArrays",
    "paragraphColumn",
    "speakerColumn",
    "cpnColumn",
    "tableName",
    "fnum"
  ],
  directives: {
    custom: {
      bind: (el, binding, vnode) => {
        if (binding.value.col == binding.value.annonCol) {
          el.addEventListener("keyup", $event => {
            binding.value.eventBus.$emit(
              "changeAnnonatorValue",
              $event.target.value
            );
          });
        } else if (binding.value.col == binding.value.cpnCol) {
          el.addEventListener("keyup", $event => {
            binding.value.eventBus.$emit("changeCpnValue", $event.target.value);
          });
        }
      }
    }
  },
  created() {
  
    this.eventBus.$on("changeAnnonatorValue", data => {
      this.changeAnnonatorField(data);
    });

    this.eventBus.$on("changeCpnValue", data => {
      this.changeCpnField(data);
    });
  },
  mounted() {
    this.totalRows = this.csvDataArray.length;
    this.disablePagination();
  },

  data() {
    return {
      loadingServer:false,
      eventBus: bus,
      footerKey: 0,
      isSpeakerSelected: false,
      orginalColumVisibilityMap: [...this.columVisibilityMap],
      isPaginationActive: false,
      totalRows: null,
      currentPage: 1,
      totalPages: null,
      perPage: 60,
      startIndex: 0,
      endIndex: null
    };
  },
  methods: {
    getTextAreaRows(col, text) {

      if(text == null){
        text = '';
      }
     // text = text.replace(/\./g, "");

      var maxTextLengthInRow;
      if (col == this.paragraphColumn) {
        maxTextLengthInRow = 35;
      } else {
        maxTextLengthInRow = 13;
      }

      var textLength = text.length;

      if (textLength > maxTextLengthInRow) {
        var rows = Math.ceil(textLength / maxTextLengthInRow);

        return rows;
      } else {
        return 1;
      }
    },
    getTextAreaCols(col, text) {
      if (col == this.paragraphColumn) {
        return 45;
      } else {
        return 20;
      }
    },
    pushDataToServer() {

      this.loadingServer = true;

        axios.post(`/${this.tableName}/${this.fnum}`, this.csvDataArray).then((response) => {
          console.log(response);

          if(response.data.status == "success"){
            this.loadingServer = false;
            alert(response.data.message);
            window.location.reload();
          }else{
            this.loadingServer = false;
            alert(response.data.message);
          }

        //  alert("data pushed to server");
        //  window.location.reload();

        });

      


      // var csvStringArray = [];
      // csvStringArray.push(this.firstRowTitles.join(","));

      // for (let i = 0; i < this.csvDataArray.length; i++) {
      //   const row = this.csvDataArray[i];
      //   for (let e = 0; e < this.csvDataArray[i].length; e++) {
      //     this.csvDataArray[i][e] = this.csvDataArray[i][e]
      //       .replace(/\n/g, "")
      //       .trim();
      //   }
      //   const rowString = row.join(",");
      //   csvStringArray.push(rowString);
      // }

      // var csv = csvStringArray.join("\n");
      // var csvFile;
      // var downloadLink;
      // csvFile = new Blob([csv], { type: "text/plain", endings: "native" });
      // downloadLink = document.createElement("a");
      // downloadLink.download = "label_" + this.fileName;
      // downloadLink.href = window.URL.createObjectURL(csvFile);
      // downloadLink.style.display = "none";
      // document.body.appendChild(downloadLink);
      // downloadLink.click();
    },
    handleSelectedText(data) {
      if (data.text == "") {
        alert("empty text");
      } else {
        var textString = data.text.trim();
        const rowSpeakerString = this.csvDataArray[data.row][
          this.speakerColumn
        ];

       /// console.log(rowSpeakerString);

        if (
          textString.toLowerCase() == "speaker1" ||
          textString.toLowerCase() == "speaker2" ||
          textString.toLowerCase() == "channel_1" ||
          textString.toLowerCase() == "channel_2" ||
          textString.toLowerCase() == "both" ||
          textString.toLowerCase() == "neither" 
        ) {
          var speakerRowsArray = [];

          for (let index = 0; index < this.csvDataArray.length; index++) {
            this.csvDataArray[index][data.col] = textString;
          }
        }

        this.csvDataArray[data.row][data.col] = textString;

        // this.replaceArray(this.columVisibilityMap, this.orginalColumVisibilityMap);
        this.columVisibilityMap[data.col] = true;
        this.forceRerenderFooter();
      }

      this.$forceUpdate();
      // this.TableFooter.$forceUpdate();
    },
    replaceArray(reference, array) {
      [].splice.apply(reference, [0, reference.length].concat(array));
    },
    selectSpeakerActive(event, col) {
      if (col == this.speakerColumn) {
        var input = event.target;

        input.focus();
        input.select();

        this.isSpeakerSelected = true;
      } else {
        this.isSpeakerSelected = false;
      }
    },
    forceRerenderFooter() {
      this.footerKey += 1;
    },
    changeAnnonatorField(value) {
      for (let index = 0; index < this.csvDataArray.length; index++) {
        this.csvDataArray[index][this.paragraphColumn + 1] = value;
      }
    },
    changeCpnField(value) {
      for (let index = 0; index < this.csvDataArray.length; index++) {
        this.csvDataArray[index][this.cpnColumn] = value;
      }
    },
    onNextPage(event) {
      event.preventDefault();

      if (this.currentPage <= this.totalPages) {
        this.currentPage++;
        this.startIndex = this.endIndex;
        this.endIndex = this.endIndex + this.perPage;
        console.log(
          `total rows: ${this.totalRows}, total pages: ${this.totalPages}, current page: ${this.currentPage}, per page: ${this.perPage}, total pages: ${this.totalPages}, start idex: ${this.startIndex}, end index: ${this.endIndex}`
        );
      }
    },
    onPreviousPage(event) {
      event.preventDefault();
      if (this.currentPage > 1) {
        this.currentPage--;
        this.endIndex = this.startIndex;
        this.startIndex = this.endIndex - this.perPage;
        console.log(
          `total rows: ${this.totalRows}, total pages: ${this.totalPages}, current page: ${this.currentPage}, per page: ${this.perPage}, total pages: ${this.totalPages}, start idex: ${this.startIndex}, end index: ${this.endIndex}`
        );
      }
    },
    onPageNumber(event, n) {
      event.preventDefault();
      this.resetPageTo(n);
    },
    onChangePerPage() {
      if (this.totalRows < this.perPage) {
        this.perPage = this.totalRows;
      }
      // this.perPage = parseInt(this.perPage);
      var n = 1;
      this.resetPageTo(n);
    },
    onPaginationToggle() {
      if (this.isPaginationActive) {
        this.enablePagination();
        this.resetPageTo(1);
      } else {
        this.disablePagination();
      }
    },
    disablePagination() {
      this.startIndex = 0;
      this.endIndex = this.totalRows;
      this.togglePagination = false;
      this.isPaginationActive = false;
      console.log(
        `total rows: ${this.totalRows}, total pages: ${this.totalPages}, current page: ${this.currentPage}, per page: ${this.perPage}, total pages: ${this.totalPages}, start idex: ${this.startIndex}, end index: ${this.endIndex}`
      );
    },
    enablePagination() {
      this.totalPages = Math.ceil(this.totalRows / this.perPage);
      this.endIndex = this.perPage;

      if (this.totalRows < this.perPage) {
        this.perPage = this.totalRows;
      }

      console.log(
        `total rows: ${this.totalRows}, total pages: ${this.totalPages}, current page: ${this.currentPage}, per page: ${this.perPage}, total pages: ${this.totalPages}, start idex: ${this.startIndex}, end index: ${this.endIndex},`
      );
    },
    resetPageTo(n) {
      const std = n - 1;
      this.totalPages = Math.ceil(this.totalRows / this.perPage);
      this.currentPage = n;
      this.startIndex = std * this.perPage;
      this.endIndex = std * this.perPage + this.perPage;
      console.log(
        `total rows: ${this.totalRows}, total pages: ${this.totalPages}, current page: ${this.currentPage}, per page: ${this.perPage}, total pages: ${this.totalPages}, start idex: ${this.startIndex}, end index: ${this.endIndex}`
      );
    },
    showPaginationBar() {
    
      return (this.totalRows > this.perPage);
    },
    isSpeaker1(row){
        
        return(this.csvDataArray[row][this.speakerColumn].toLowerCase().includes("speaker1"))
    }
  }
};
</script>



<style lang="scss">
#tableHead td {
  position: sticky;
  top: 100px;
  background: steelblue;
  color: white;
}

.greenBackground{
  background: #4CAF50;

  &:hover{
     background-color: #388E3C !important;
  }
}
.circular-button-fab-download {
  border-radius: 30px;
  color: #fff;
  background-color: #43a047;
  border-color: #388e3c;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 45px;
  padding: 16px;
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 70px;
  z-index: 1003;
  &:hover {
    background-color: #1b5e20;
    cursor: pointer;
  }
}

.circular-button-fab-paginate {
  border-radius: 30px;
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 120px;
  padding: 16px;
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 70px;
  z-index: 1003;
  &:hover {
    background-color: #283593;
    cursor: pointer;
  }
  &.active {
    background-color: #283593;
    &:hover {
      background-color: #d9534f;
    }
  }
  .togglePaginationLabel {
    height: 56px;
    width: 57px;
    margin-left: -15px;
    margin-bottom: 0px !important;
    margin-top: 13px !important;
    transform: translateY(-15px);
    &:hover {
      cursor: pointer;
    }
  }
  .pagination {
    justify-content: center !important;
  }
  .pagination-wrapper {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
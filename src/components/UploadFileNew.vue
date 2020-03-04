<template>
  <div>
    <div class="container">
      <form enctype="multipart/form-data">
        <div class="input-group">
          <div class="custom-file">
            <input
              type="file"
              ref="file"
              class="custom-file-input"
              id="custom-file"
              @change="uploadFile"
            />
            <label class="custom-file-label" for="custom-file">{{
              selectedFileName
            }}</label>
          </div>
          <div class="input-group-append"></div>
        </div>
      </form>
    </div>

    <TableView
      v-if="csvDataArray.length > 0"
      :csv-data-array="csvDataArray"
      :file-name="selectedFileName"
      :first-row-titles="firstRowTitles"
      :colum-visibility-map="columVisibilityMap"
      :read-only-columns-length="readOnlyColumnsLength"
      :paragraph-column="paragraphColumn" 
      :speaker-column="speakerColumn"
      :context-menu-dropdown-arrays="contextMenuDropdownArrays"
      :cpn-column="cpnColumn"
    />
  </div>
</template>

<script>
import TableView from "./TableView.vue";

export default {
  components: {
    TableView
  },
  data() {
    return {
      selectedFileName: "Choose File",
      csvFile: null,
      initialTableDataArray: [],
      columnNamesArray: [],
      cpn_name: "",
      csvDataArray: [],

      // Setting that are variable for different CSV's

      firstRowTitles: [
      "fnum",
        "line",
        "speaker",
        "paragraph",
        "annotators_name",
        "TOPIC1",
        "twrd1",
        "pharse1",
        "TOPIC2",
        "twrd2",
        "pharse2",
        "sentiment_phrase1",
        "sentiment_phrase2",
        "promise1",
        "pwrd1",
        "promise_phrase1",
        "promise2",
        "pwrd2",
        "promise_phrase2",
        "promise_comment",
        "cpn_name",
        "agent",
        "customer"
      ],
      columVisibilityMap: [
                            false,
                            false,
                            true,
                            true,
                            true,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            true,
                            false,
                            false
      ],
       contextMenuDropdownArrays: {
        topic: {
          "CD DISC": ["Disconnect"],
          "CD BILL": ["Bill Explanation"],
          "CD EQIP": ["How to Setup/Activate", "Setup/Activation Issues"],
          "CD ACCT": [
            "Port Status",
            "Assumption of Liability",
            "Insurance (TEC/TMP)",
            "Corporate Information",
            "Call Message Block",
            "Change MTN",
            "Prepaid Information",
            "Spam/Spoof"
          ],
          "CD TRBL": [
            "Voice",
            "Date Connection/Browser",
            "Device Settings & Issues"
          ],
          "CD PYMT": ["Promise to Pay", "Make Payment INTL"],
          "CD INTL": ["Travel Pass", "International Plan Feature Optl"],
          "CD PLAN": ["Review Current PLAN", "Add/Change"],
          "CD UPGR": [
            "Marketing/Promotional Offers",
            "Device Trade in/Recycling"
          ],
          "CD BILL ELEU": ["Discount"]
        },
        promise: [
          "Call_back",
          "Drop_ship",
          "Dispatch",
          "Send_to_offline",
          "No_charge",
          "Transfer",
          "First_appointment",
          "Sooner_appointment",
          "Will_be_there_today",
          "Refer_to_other_group",
          "Outage_will_be_resolved_by_time",
          "OTHER",
          "NO_PROMISE",
          "BROKEN_PROMISE",
          "promise_cancelled"
        ]
      },
      readOnlyColumnsLength : 4,  // upto first four cols would be read only
      paragraphColumn: 3, // paragraph column number
      speakerColumn:2, // speaker column number
      cpnColumn : 20
      
    };
  },
  methods: {
    getExtension(filename) {
      filename = filename.toString();
      var parts = filename.split(".");
      return parts[parts.length - 1].trim();
    },
    readFile() {
      var reader = new FileReader();
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader.onload = e => {
          var rows = e.target.result.split("\n");
          this.csvDataArray = [];

          var titlesLength = this.firstRowTitles.length;

        

          for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].split(",");
            var lengthDeficit = titlesLength - cells.length;
           
            if (lengthDeficit > 0) {
              for (var o = 0; o < lengthDeficit; o++) {
                cells.push("");
              }
            }

         
          
            var row = [];
            for (var j = 0; j < cells.length; j++) {
                if(cells[j].trim().length > 0){
                
                if(j > this.speakerColumn){
                  this.columVisibilityMap[j] = true;
                }
                
              }
              row.push(cells[j]);
            }
            this.csvDataArray.push(row);
          }
        };
        reader.readAsText(this.file);
      } else {
        alert("The File APIs are not fully supported in this browser.");
      }
    },
    uploadFile() {
      this.file = this.$refs.file.files[0];

      if (this.file && this.file.name && this.getExtension(this.file.name)) {
        this.selectedFileName = this.file.name.toString();
        this.readFile();
      } else {
        alert("Invalid file, Please upload a csv file");
      }
    }
  }
};
</script>

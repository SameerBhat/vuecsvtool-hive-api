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
      firstRowTitles: [
        "fnum",
        "line",
        "time",
        "speaker",
        "paragraph",
        "annotators_name",
        "promise1",
        "pwrd1",
        "promise_phrase1",
        "promise2",
        "pwrd2",
        "promise_phrase2",
        "promise_comment",
        "TOPIC1",
        "twrd1",
        "pharse1",
        "TOPIC2",
        "twrd2",
        "pharse2",
        "sentiment_phrase1",
        "sentiment_phrase2",
        "cpn_name",
        "agent",
        "customer"
      ],
      columVisibilityMap: [
        false,
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
          Internet: [
            "Account_setup",
            "i_Can_t_connect_all",
            "i_Can_t_connect_device",
            "i_Customer_Equipment",
            "i_Email",
            "i_Mobile_TV_apps",
            "i_Slow_connection",
            "i_Wi_Fi"
          ],
          Phone: [
            "All_Services_out",
            "p_Calling_features",
            "p_Can_t_be_called",
            "p_Can_t_call_long_distance",
            "p_Can_t_call_out",
            "p_CPE_Jacks",
            "p_Miscellaneous",
            "p_No_Dial_Tone",
            "p_Noise_Static",
            "p_ONT_battery",
            "p_Order_billing",
            "p_Physical_Outside",
            "p_Self_install",
            "p_Voicemail"
          ],
          TV: [
            "All_channels_out",
            "t_Audio_problems",
            "t_Cable_card",
            "t_Caller_ID_on_TV",
            "t_Customer_Equipment",
            "t_DVR_functionality",
            "t_Interactive_Media_Guide",
            "t_Mobile_TV_apps",
            "t_On_Demand",
            "t_Pay_per_view",
            "t_Remote_controls",
            "t_Set_top_box_problems",
            "t_Some_Channels_Out",
            "t_STB_activation",
            "t_TV_content_questions"
          ],
          "Other": ["Other"]
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
      readOnlyColumnsLength: 5, // upto first five cols would be read only
      paragraphColumn: 4, // paragraph column number
      speakerColumn: 3, // speaker column number
      cpnColumn: 21
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

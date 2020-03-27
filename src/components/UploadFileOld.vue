<template>
  <div>
    <div class="container">

    <div class="form-row">
    <div class="col">
      <label for="tableName">Table Name</label>
      <input type="text" class="form-control" id="tableName" aria-describedby="tableNameHelp" placeholder="Enter Table Name" v-model="tableName">
      <small id="tableNameHelp" class="form-text text-muted">Enter the name of the transcript file.</small>
    </div>
    <div class="col">

    <label for="fnum">Fnum</label>
    <input type="text" class="form-control" id="fnum" aria-describedby="fnumHelp" placeholder="Enter fnum" v-model="fnum">
    <small id="fnumHelp" class="form-text text-muted">Enter the fnum.</small>
    </div>


    <div class="col">
      <label></label>
       <button class="btn btn-primary btn-block mt-2" :disabled="loadingTranscripts" @click="loadDataFromApi">
       <span class="spinner-border spinner-border-sm" v-if="loadingTranscripts" role="status" aria-hidden="true"></span>
       Load transcripts
      </button>
    </div>
  </div>
  

     



  
   
     
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
      :table-name="tableName"
      :fnum="fnum"/>
  </div>

</template>

<script>
import TableView from "./TableView.vue";
import axios from 'axios';

export default {
  components: {
    TableView
  },
  data() {
    return {
      selectedFileName: "Choose File",
      tableName: "dom_nap_raw_trans_data",
      fnum: "",
      loadingTranscripts: false,
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
    loadDataFromApi(){
      if(this.tableName.length >0 && this.fnum.length >0){
      this.loadingTranscripts = true;
      axios.get(`/${this.tableName}/${this.fnum}`).then(response => {
        this.loadingTranscripts = false;
        if(response.data.length >0){
          response.data.forEach(row => {
            this.csvDataArray.push(Object.values(row));
             console.log(Object.values(row));
          });
        }else{
          alert("No results found")
        }
        
      }).catch((error) =>{
        this.loadingTranscripts = false;
        console.log(error);
        alert("Something went wrong...")
        
        });

      }else {
        alert("Please fill in all the required fields")
      }

    }
  }
};
</script>

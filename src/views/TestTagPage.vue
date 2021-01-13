<template>
    <div>
        <b-row>
            <b-col class="mt-1">
                <h5>Quuppa Tag Position</h5>
            </b-col>
            <b-col class="mt-1">
                <b-row>
                    <b-col>
                        <b-input-group size="sm">
                            <template #prepend>
                                <b-input-group-text>Read every</b-input-group-text>
                            </template>
                            <b-form-input v-model="ReadTime"></b-form-input>  
                            <template #append>
                                <b-input-group-text>Sec.</b-input-group-text>
                            </template>                                  
                        </b-input-group>
                    </b-col>
                    <b-col cols="3">
                        <label class="float-right mr-4">Refresh:{{ ReadTime-RefeshTime }}</label>
                    </b-col>
                    <b-col cols="1">
                        <b-button class="float-right mr-2" size="sm" variant="primary" @click="AddTag">Add</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
         <b-row>
            <b-col cols="6" v-for="(tag, index) in TagList" :key="index">
                <b-card no-body class="mt-2 ml-2 mr-2 mb-2" @click="UpdateTag(tag)">
                    <b-card-body>
                        <b-row>
                            <b-col class="text-right" cols="2"></b-col>
                            <b-col class="text-center">ID</b-col>
                            <b-col class="text-center">Name</b-col>
                        </b-row>
                        <b-row>
                            <b-col class="text-right" cols="2">Tag:</b-col>
                            <b-col class="text-center"><b-form-input v-model="tag.id"></b-form-input></b-col>
                            <b-col class="text-center"><b-form-input readonly v-model="tag.name" v-bind:style="'background:'+tag.color+';color:white'"></b-form-input></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="text-right" cols="2"></b-col>
                            <b-col class="text-center">X</b-col>
                            <b-col class="text-center">Y</b-col>
                        </b-row>
                        <b-row>
                            <b-col class="text-right" cols="2">Target:</b-col>
                            <b-col class="text-center"><b-form-input v-model="tag.target[0]" type="number"></b-form-input></b-col>
                            <b-col class="text-center"><b-form-input v-model="tag.target[1]" type="number"></b-form-input></b-col>
                        </b-row>
                        <b-row class="mt-1">
                            <b-col class="text-right" cols="2">Detected:</b-col>
                            <b-col class="text-center"><b-form-input v-model="tag.position[0]" type="number" readonly></b-form-input></b-col>
                            <b-col class="text-center"><b-form-input v-model="tag.position[1]" type="number" readonly></b-form-input></b-col>
                        </b-row>     
                        <b-row class="mt-1">
                            <b-col class="text-right" cols="2">Diff:</b-col>
                            <b-col class="text-center"><b-form-input v-model="tag.diff[0]" type="number" readonly></b-form-input></b-col>
                            <b-col class="text-center"><b-form-input v-model="tag.diff[1]" type="number" readonly></b-form-input></b-col>
                        </b-row>   
                        <b-row class="mt-1">
                            <b-col cols="2">
                                <b-button class="float-right mr-2" variant="danger" size="sm" @click="DeleteTag(tag)"><b-icon-trash></b-icon-trash></b-button>
                            </b-col>
                            <b-col>
                                <b-input-group>
                                    <template #prepend>
                                        <b-input-group-text><strong>Accuracy</strong></b-input-group-text>
                                    </template>
                                    <b-form-input v-model="tag.positionAccuracy" type="number"></b-form-input>
                                </b-input-group>
                            </b-col>
                            <b-col>
                                <b-input-group>
                                    <template #prepend>
                                        <b-input-group-text><b-icon-clock-fill></b-icon-clock-fill></b-input-group-text>
                                    </template>
                                    <b-form-input v-model="tag.TS"></b-form-input>                                    
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import PosService from '../services/PositionService.vue'

export default {
    data(){
        return{
            TagList:[
                {id:"",name:"Tag1",position:[0,0,0],positionAccuracy:0,positionTS:1430140978241,color:"black",target:[0,0,0],TS:"",diff:[0,0,0]},
                // {id:"B",name:"Tag2",position:[0,0,0],positionAccuracy:0,positionTS:1430140978241,color:"green",target:[0,0,0],TS:"",diff:[0,0,0]},
                // {id:"C",name:"Tag3",position:[0,0,0],positionAccuracy:0,positionTS:1430140978241,color:"blue",target:[0,0,0],TS:"",diff:[0,0,0]},
                // {id:"D",name:"Tag4",position:[0,0,0],positionAccuracy:0,positionTS:1430140978241,color:"yellow",target:[0,0,0],TS:"",diff:[0,0,0]},
            ],
            CountDownRefresh:0,
            RefeshTime:0,
            ReadTime:1
        }
    },
    methods:{
        UpdateDatefromStamp(Tag){
            // let unix_timestamp = 1549312452
            let unix_timestamp = Tag.positionTS
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            // var date = new Date(unix_timestamp * 1000);
            var date = new Date(unix_timestamp);
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();

            var formattedTime = day+'/'+month+'/'+year+' '+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            Tag.TS = formattedTime;
        },
        UpdateDiffPostion(Tag){
            Tag.diff[0] = Tag.target[0] - Tag.position[0]; //X
            Tag.diff[1] = Tag.target[1] - Tag.position[1]; //Y
        },
        UpdateTag(Tag){
            this.UpdateDiffPostion(Tag);
            this.UpdateDatefromStamp(Tag);
        },
        GetTagsPosition(){
            if(this.TagList.length == 0)
                return;

            for(let i = 0; i < this.TagList.length; i++){
                let _Tag = this.TagList[i];
                if(_Tag.id != "")
                    this.GetPosTag(_Tag);
            }
        },
        GetPosTag(Tag){
            PosService.GetTagPos(Tag.id)
                .then(res => {
                    if(res.data.tags.length > 0){
                        Tag = res.data.tags[0];
                        this.UpdateTag(Tag);
                    }
                })
                .catch(err => {
                    window.console.log(err);
                })
        },
        AutoRefresh(){
            this.RefeshTime++;
            if(this.RefeshTime-1 == this.ReadTime){
                this.GetTagsPosition();
                this.RefeshTime = 0;
            }
        },
        DeleteTag(Tag){
            this.TagList = this.TagList.filter(x => x.id != Tag.id);
        },
        AddTag(){
            let NewTag = {
                id:"",
                name:"NewTag",
                position:[0,0,0],
                positionAccuracy:0,
                positionTS:1430140978241,
                color:"black",
                target:[0,0,0],
                TS:"",
                diff:[0,0,0]
            }
            this.TagList.push(NewTag);
        }
    },
    timers: {
        AutoRefresh: { time: 1000, autostart: true, repeat:true }
    },
}
</script>

<style scoped>

</style>
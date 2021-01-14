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
                    <b-col cols="4">
                        <b-button class="float-right mr-2" size="sm" variant="warning" @click="ShowVisual()"><b-icon-cursor></b-icon-cursor> Visual</b-button>
                        <b-button class="float-right mr-2" size="sm" variant="primary" @click="AddTag"><b-icon-tag></b-icon-tag> Add</b-button>                        
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <!-- <canvas id="SimCV" v-bind:style="{position: 'absolute', left:'500px', top: 70, 'z-index': 0}" ></canvas> -->

        <b-row v-if="VisualOpen == true">
            <b-col>
                <!-- <canvas id="SimCV" v-bind:style="{position: 'absolute', left:50, top: 50, 'z-index': 0}" ></canvas> -->
            </b-col>
            <b-col cols="2">
                <b-row>
                    <b-col></b-col>
                    <b-col><strong>X</strong></b-col>
                    <b-col><strong>Y</strong></b-col>
                </b-row>
                <b-row>
                    <b-col><label class="float-right text-success">Center</label></b-col>
                    <b-col>{{CenterX}}</b-col>
                    <b-col>{{CenterY}}</b-col>
                </b-row>
                <b-button class="float-right mr-2" size="sm" variant="dark" @click="VisualOpen=false"><b-icon-arrows-angle-contract></b-icon-arrows-angle-contract> Hide</b-button>

            </b-col>
            <b-col cols="3">
                <b-input-group class="mt-1 pr-2">
                    <template #prepend>
                        <b-input-group-text><strong>X:{{Visual[0].X}} Y:{{Visual[0].Y}}</strong></b-input-group-text>
                    </template>
                    <b-form-select v-model="Visual[0].Tag" :options="optTag"></b-form-select>
                    <template #append>
                        <b-input-group-text><strong>A</strong></b-input-group-text>
                    </template>                    
                </b-input-group>

                <b-input-group class="mt-1 pr-2">
                    <template #prepend>
                        <b-input-group-text><strong>X:{{Visual[1].X}} Y:{{Visual[1].Y}}</strong></b-input-group-text>
                    </template>
                    <b-form-select v-model="Visual[1].Tag" :options="optTag"></b-form-select>
                    <!-- <b-form-input v-model="Visual[1].Tag"></b-form-input> -->
                    <template #append>
                        <b-input-group-text><strong>B</strong></b-input-group-text>
                    </template>                    
                </b-input-group>

                <b-input-group class="mt-1 pr-2">
                    <template #prepend>
                        <b-input-group-text><strong>X:{{Visual[2].X}} Y:{{Visual[2].Y}}</strong></b-input-group-text>
                    </template>
                    <b-form-select v-model="Visual[2].Tag" :options="optTag"></b-form-select>
                    <template #append>
                        <b-input-group-text><strong>C</strong></b-input-group-text>
                    </template>                    
                </b-input-group>

                <b-input-group class="mt-1 pr-2">
                    <template #prepend>
                        <b-input-group-text><strong>X:{{Visual[3].X}} Y:{{Visual[3].Y}}</strong></b-input-group-text>
                    </template>
                    <b-form-select v-model="Visual[3].Tag" :options="optTag"></b-form-select>
                    <template #append>
                        <b-input-group-text><strong>D</strong></b-input-group-text>
                    </template>                    
                </b-input-group>
            </b-col>
        </b-row>

         <b-row>
            <b-col cols="6" v-for="(tag, index) in TagList" :key="index">
                <b-card no-body class="mt-2 ml-2 mr-2 mb-2">
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
                            <b-col class="text-center"><b-form-input v-model.number="tag.target[0]" type="number"></b-form-input></b-col>
                            <b-col class="text-center"><b-form-input v-model.number="tag.target[1]" type="number"></b-form-input></b-col>
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
            ReadTime:1,
            VisualOpen:false,
            Visual:[
                {Tag:"", X:0, Y:0},
                {Tag:"", X:0, Y:0},
                {Tag:"", X:0, Y:0},
                {Tag:"", X:0, Y:0}
            ],
            CenterX:0,
            CenterY:0,
            optTag:[],
            SimCV:{}
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
            this.UpdateVisualTag(Tag);
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
                    console.log(res);
                    if(res.data.tags.length > 0){
                        Tag = res.data.tags[0];
                        this.UpdateTag(Tag);
                    }
                })
                .catch(err => {
                    // this.UpdateVisualTag(Tag); //TestOnly
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
        },
        ShowVisual(){
            this.VisualOpen = true;
            this.optTag = [];
            let opt = { text: "--Select--", value: "" };
            this.optTag.push(opt);
            for(let i = 0; i < this.TagList.length; i++){
                opt = { text: this.TagList[i].name, value: this.TagList[i].id };
                this.optTag.push(opt);
            }
        },
        UpdateVisualTag(Tag){
            let VTag = this.Visual.filter(x => x.Tag == Tag.id);
            // console.log(VTag);
            if(VTag.length > 0){
                VTag.X = Tag.position[0];
                VTag.Y = Tag.position[1];
                // VTag[0].X = Tag.target[0];
                // VTag[0].Y = Tag.target[1];
            }
            this.CalculateCenter();
        },
        CalculateCenter(){
            let SumX = 0;
            let SumY = 0;
            for(let i = 0; i < this.Visual.length; i++){
                SumX += this.Visual[i].X;
                SumY += this.Visual[i].Y;
            }
            let CX = SumX/this.Visual.length;
            let CY = SumY/this.Visual.length;
            this.CenterX = CX;
            this.CenterY = CY;
        },
        DrawVisual(){
            let c = document.getElementById("SimCV");
            c.width = 200;
            c.height = 200;  
            let ctx = c.getContext("2d");    
            this.SimCV = ctx;

            // let X = 0;
            // let Y = 0;

            this.SimCV.beginPath();
            this.SimCV.lineWidth = "0.5";
            this.SimCV.strokeStyle = "#F9B223";
            this.SimCV.rect(0, 20, 100, 100);
            this.SimCV.stroke();
        }
    },
    mounted(){
        
    },
    timers: {
        AutoRefresh: { time: 1000, autostart: true, repeat:true }
    },
    watch:{
        ReadTime(){
            this.RefeshTime = 0;
        }
    }
}
</script>

<style scoped>

</style>
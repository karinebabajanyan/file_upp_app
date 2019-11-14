<template>
  <div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label><br/>
        <input
                type="file"
                ref="file"
                @change="onSelect"
        />
      </div>
      <div class="fields">
        <button>Submit</button>
      </div>
      <div class="message">
        <h5>{{message}}</h5>
      </div>
    </form>
  </div>
</template>

<script>
//    import { axios } from '@/plugins/axios'
    export default {
        name: 'FileUpload',
        data() {
            return {
                file:"",
                message:""
            }
        },
        methods: {
            onSelect(){
                const allowedTypes = ["application/vnd.ms-excel"];
                const file = this.$refs.file.files[0];
                this.file = file;
                if(!allowedTypes.includes(file.type)){
                    this.message = "Filetype is wrong!!"
                }else{
                    this.message = "Filetype is OK!!";
                }
                this.message = this.$refs.file.result;
            },
            async onSubmit(){
                const formData = new FormData();
                formData.append('file',this.file);
//                console.log(formData);
                try{
//                    this.axios.post('http://localhost:3000/api/records',formData);
//                    console.log(formData);
                    this.message = 'Uploaded!!'+'./'+this.file.name;

                    var model = null;
                    var xlsx  = './'+this.file.name;

                    this.mongoxlsx.xlsx2MongoData(xlsx, model, function(err, data) {
                        const date=data;
                        this.message = 'Uploaded!!'+date;
//                        console.log(data);
                        /*
                        [{ Name: 'Eddie', Email: 'edward@mail' }, { Name: 'Nico', Email: 'nicolas@mail' }]
                        */
                    });
                }
                catch(err){
//                    console.log(err);
                    this.message = err.response.data.error
                }
            }
        },
    }
</script>
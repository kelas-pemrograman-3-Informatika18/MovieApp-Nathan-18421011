<template>
    <q-page padding>
        <div class="row q-mb-md col-gutter-md">
        <div class="col-md-12 col-xs-12 col-lg-12">
            <div class="row">
            <div class="col-auto">
                <div class="left blue"></div>
            </div>
            <div class="col">
                <q-banner inline-actions class="text-blue-grey-14">
                <div class="text-h6">Edit Movie</div>
                <div>Edit Movies di Website</div>
                </q-banner>
            </div>
            </div>
        </div>
        </div>
        <q-card flat>
            <q-card-section class="row">
                <q-form
                @submit="onSubmit()"
                @reset="onReset()"
                class="q-col-gutter-md q-col-lg-6 col-md-6 col-xs-12"
                >
                <q-input
                    filled
                    label="Judul Film"
                    v-model="form.judulFilm"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Ketik judul film']"
                />

                <q-input
                    filled
                    label="Harga"
                    type="number"
                    v-model="form.harga"
                    lazy-rules
                    :rules="[ val => val  > 0 || 'masukan harga film']"
                />

                <q-input
                    filled
                    label="Tahun"
                    v-model="form.tahun"
                    lazy-rules
                    :rules="[ val => val > 0 || 'ketik tahun film']"
                />

                <q-select filled v-model="form.genre" :options="optionGenre" label="Genre" />

                <q-rating
                v-model="form.rating"
                size="2em"
                :max="5"
                color="primary"
                 />

                 <q-input
                    v-model="form.deskripsi"
                    filled
                    type="textarea"
                    label="Deskripsi"
                 />

                 <q-file accept=".jpg, image/*" filled v-model="image" color="primary" label="Image">
                    <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                    </template>
                </q-file>

                <div>
                    <q-btn label="Submit" type="submit" color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        judulFilm: null,
        harga: 0,
        tahun: null,
        genre: null,
        rating: 0,
        deskripsi: null
      },
      optionGenre: [
        'Action',
        'Comedy',
        'Crime',
        'Drama',
        'Family',
        'Noir',
        'Survival'
      ],
      image: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`movie/getbyid/${this.$route.params.id}`)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$router.push({ name: 'dataMovie' })
          }
        })
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.put(`movie/edit/${this.$route.params.id}`, formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataMovie' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    onReset () {
      this.form.judulFilm = null
      this.form.harga = null
      this.form.tahun = null
      this.form.genre = null
      this.form.rating = null
      this.form.deskripsi = null
      this.image = null
    }
  }
}
</script>
<style scoped>
.left {
  width: 5px;
  height: 100%;
  background-color: firebrick;
}
</style>>

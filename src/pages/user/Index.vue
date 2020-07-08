<template>
    <q-page padding>
        <div class="q-mb-xl">
            <q-carousel
                animated
                v-model="slide"
                navigation
                infinite
                autoplay
                swipeable
                arrows
                transition-prev="slide-right"
                transition-next="slide-left"
                >
                <q-carousel-slide :name="1" img-src="https://image-cdn.essentiallysports.com/wp-content/uploads/20200627150148/last-of-us-2-header-1.jpg" />
                <q-carousel-slide :name="2" img-src="https://kutu-film.com/wp-content/uploads/2019/12/Featured-Image-Black-Widow-1-1024x512.jpg" />
                <q-carousel-slide :name="3" img-src="https://i.ytimg.com/vi/0hAL7emClFM/maxresdefault.jpg" />
                <q-carousel-slide :name="4" img-src="https://i.ytimg.com/vi/YqNYrYUiMfg/maxresdefault.jpg" />
            </q-carousel>
        </div>
        <div class="row q-col-gutter-md">
            <div class="col-md-3 col-xs-12" v-for="(movie, i) in data" :key="i" >
                <q-card>
                    <q-img :ratio="16/9" :src="`${$baseImageURL}/${movie.image}`" />

                    <q-card-section>
                        <div>
                          <q-btn
                        fab
                        color="pink-13"
                        icon="favorite"
                        class="absolute"
                        unelevated
                        style="top: 0; right: 12px; transform: translateY(-50%);"
                        />
                        </div>

                        <div class="no-wrap items-center">
                        <div class="text-h6">
                            {{ movie.judulFilm }}
                        </div>
                        <div class="text-grey">
                            {{ movie.tahun }}
                        </div>
                        </div>

                        <q-rating v-model="movie.rating" readonly color="orange-5" :max="5" size="32px" />
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-subtitle">
                        Harga: Rp. {{ movie.harga }},-
                        </div>
                        <div class="text-subtitle1">
                        {{ movie.genre }}
                        </div>
                        <div @click="movie.expanded = !movie.expanded" class="text-caption text-grey cursor-pointer">
                          <q-btn color="grey" round flat dense icon="label" @click="expanded = !expanded"/>
                        description
                        </div>
                    <q-slide-transition>
                        <div v-show="movie.expanded">
                            <div class="text-grey text-caption">
                            {{ movie.deskripsi }}
                            </div>
                        </div>
                        </q-slide-transition>
                    </q-card-section>

                    <q-card-actions>
                        <q-btn unelevated @click="openDetail(movie)" class="full-width" color="black">
                        Order Now
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <q-dialog v-model="dialog" v-if="dialog" position="bottom">
            <q-card style="width: 500px">
                <q-card-section>
                    <div class="text-h6">Detail Pemesanan</div>
                </q-card-section>
                <q-card-section style="max-height: 50vh;" class="scroll">
                    {{ activeData.judulFilm }} - Rp. {{ activeData.harga }},-
                    <q-form class="q-mt-md">
                        <q-input filled type="number" v-model="jumlah" label="Masukan Jumlah"/>
                        Rp. {{ total }},-
                        <q-file color="primary" class="q-mt-md" filled v-model="image" label="Upload Bukti Pembayaran">
                            <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                            </template>
                        </q-file>
                    </q-form>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Batal" v-close-popup/>
                    <q-btn color="primary" @click="prosesTransaksi()" label="Proses"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      stars: 5,
      dialog: false,
      image: null,
      data: [],
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getallmovie')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(movie => {
              return Object.assign(movie, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idFilm: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>

<template>
  <div class="border border-lightGray mt-3 p-3" >
    <h3 class="font-semibold font-museo">
      {{title}}
    </h3>

    <!-- <h6 class="flex gap-2 items-center font-semibold font-museo">
      <i-star class="text-orange" />
      Favorieten
    </h6> -->

    <div class="flex text-green justify-end items-center gap-3 text-xl">
      <h5 @click.stop="navigate()" class="hover:underline mt-1 cursor-pointer font-semibold font-museo">{{navText}}</h5>
      <i-right-arrow class="cursor-pointer" @click.stop="navigate()" />
    </div>
  </div>
</template>

<script lang="ts">
import IRightArrow from '@/components/icons/IRightArrow.vue'
import IStar from '@/components/icons/IStar.vue'
import { defineComponent, PropType } from 'vue'
import { Visum } from '@/serializer/Visum'
import { useI18n } from 'vue-i18n'
import router from '@/router'

export default defineComponent({
  name: 'PassportOverviewItem',
  components:{
    IStar,
    IRightArrow
  },
  props: {
    title: String,
    navText: String,
    navUrl: String,
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup (props, { emit }) {

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const navigate = () => {
      router.push(`/kamp/${props.visum.id}/paspoort/${props.navUrl}`)
    }

    return {
      t,
      navigate
    }
  }
})
</script>

<template>
    <div class="sharingTab__content">
        <ul>
            <li>View only</li>
            <li>Edit</li>
            <li>File drop</li>
        </ul>
    </div>
</template>
  
<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcInputField from '@nextcloud/vue/dist/Components/NcInputField.js'
export default {
    name: 'SharingDetailsTab',
    components: {
        NcButton,
        NcInputField,
    },
    data() {
        return {};
    },
    methods: {
    },
    mounted() {
    }
};
</script>
  
<style lang="scss" scoped>

</style>
  
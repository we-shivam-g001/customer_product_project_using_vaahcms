<script setup>
import {onMounted, ref, watch,computed} from "vue";
import { useCustomerStore } from '../../stores/store-customers'
import VhField from './../../vaahvue/vue-three/primeflex/VhField.vue'
import {useRoute} from 'vue-router';


const store = useCustomerStore();
const route = useRoute();

onMounted(async () => {
    if(route.params && route.params.id)
    {
        await store.getItem(route.params.id);
    }

    await store.getFormMenu();
});

const stateData = computed(() => store.assets.state_data);
const filteredStateData = computed(() => {
    if (store.item.country_id) {
        return stateData.value.filter((state) => state.parent_id === store.item.country_id);
    } else {
        return [];
    }
});
const filterStateData = () => {
    store.item.state_id = null;
};
watch(() => store.item?.country_id, () => {
    filteredStateData.value = filteredStateData.value;
});

//--------form_menu
const form_menu = ref();
const toggleFormMenu = (event) => {
    form_menu.value.toggle(event);
};
//--------/form_menu

</script>
<template>

    <div class="col-6" >

        <Panel class="is-small">

            <template class="p-1" #header>


                <div class="flex flex-row">
                    <div class="p-panel-title">
                        <span v-if="store.item && store.item.id">
                            Update
                        </span>
                        <span v-else>
                            Create
                        </span>
                    </div>

                </div>


            </template>

            <template #icons>


                <div class="p-inputgroup">

                    <Button class="p-button-sm"
                            v-if="store.item && store.item.id"
                            data-testid="customers-view_item"
                            @click="store.toView(store.item)"
                            icon="pi pi-eye"/>

                    <Button label="Save"
                            class="p-button-sm"
                            v-if="store.item && store.item.id"
                            data-testid="customers-save"
                            @click="store.itemAction('save')"
                            icon="pi pi-save"/>

                    <Button label="Create & New"
                            v-else
                            @click="store.itemAction('create-and-new')"
                            class="p-button-sm"
                            data-testid="customers-create-and-new"
                            icon="pi pi-save"/>


                    <!--form_menu-->
                    <Button
                        type="button"
                        @click="toggleFormMenu"
                        class="p-button-sm"
                        data-testid="customers-form-menu"
                        icon="pi pi-angle-down"
                        aria-haspopup="true"/>

                    <Menu ref="form_menu"
                          :model="store.form_menu_list"
                          :popup="true" />
                    <!--/form_menu-->


                    <Button class="p-button-primary p-button-sm"
                            icon="pi pi-times"
                            data-testid="customers-to-list"
                            @click="store.toList()">
                    </Button>
                </div>



            </template>


            <div v-if="store.item" class="mt-2">

                <Message severity="error"
                         class="p-container-message mb-3"
                         :closable="false"
                         icon="pi pi-trash"
                         v-if="store.item.deleted_at">

                    <div class="flex align-items-center justify-content-between">

                        <div class="">
                            Deleted {{store.item.deleted_at}}
                        </div>

                        <div class="ml-3">
                            <Button label="Restore"
                                    class="p-button-sm"
                                    data-testid="articles-item-restore"
                                    @click="store.itemAction('restore')">
                            </Button>
                        </div>

                    </div>

                </Message>




                <VhField label="Name">
                    <InputText class="w-full"
                               name="customers-name"
                               data-testid="customers-name"
                               @update:modelValue="store.watchItem"
                               v-model="store.item.name"/>
                </VhField>

                <VhField label="Profile">
                    <FileUpload mode="basic"
                                name="demo[]"
                                @uploader="store.upload"
                                :auto="true"
                                :custom-upload="true"
                                accept="image/*"
                                :maxFileSize="1000000"
                    />
                    <img :src="store.item.image_url" class="w-2 h-3"/>
                </VhField>


                <VhField label="Slug">
                    <InputText class="w-full"
                               name="customers-slug"
                               data-testid="customers-slug"
                               v-model="store.item.slug"/>
                </VhField>

                <VhField label="Is Active">
                    <InputSwitch v-bind:false-value="0"
                                 v-bind:true-value="1"
                                 class="p-inputswitch-sm"
                                 name="customers-active"
                                 data-testid="customers-active"
                                 v-model="store.item.is_active"/>
                </VhField>
                <VhField label="Email">
                    <InputText class="w-full"
                               name="products-email"
                               data-testid="products-email"
                               v-model="store.item.email"/>
                </VhField>
                <VhField label="Country">
                    <Dropdown class="w-full"
                              v-model="store.item.country_id"
                              :options="store.assets.country_data"
                              optionLabel="name"
                              placeholder="select Country"
                              optionValue="id"
                              @change="filterStateData"
                              name="products-category"
                              data-testid="products-category"
                    />
                </VhField>
                <VhField label="State">
                    <Dropdown class="w-full"
                              v-model="store.item.state_id"
                              :options="filteredStateData"
                              optionLabel="name"
                              placeholder="select Countary"
                              optionValue="id"
                              name="products-category"
                              :disabled="!store.item.country_id"
                              data-testid="products-category"
                    />
                </VhField>

            </div>
        </Panel>

    </div>

</template>

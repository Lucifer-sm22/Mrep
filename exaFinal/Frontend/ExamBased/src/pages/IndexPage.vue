<template>
  <q-page class="row items-center justify-evenly">
    <q-btn label="Nuevo registro" color="primary" @click="VievFormCreate"  />

    <q-table
      title="Treats"
      :rows="listUsr"
      :columns="columns"
      row-key="name">
      <template #body-cell-action="props">
        <q-td top-center class="q-gutter-md">
          <q-btn dense color="secondary" label="Actualizar" icon="edit" @click="editUser(props.row)" />
          <q-btn dense color="negative" label="Elimnar" icon="delete" @click="onDelete(props.row)" />
        </q-td>
        
      </template>
    </q-table>
    
    <q-dialog v-model="createS" >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Registrar estudiante</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form class="q-gutter-md">
            <q-input
              class="col-12"
              outlined
              v-model="formAsig.asignatura"
              label="asignatura *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Ingresar dato']"
            />
            <q-input
              class="col-12"
              outlined
              v-model="formAsig.nota"
              label="nota *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Ingresar dato']"
            />
            />
          </q-form>
        </q-card-section>

        <q-card-actions align ="right" class="bg-white text-teal">
          <q-btn label="Cancelar" @click="onReset" color="negative" v-close-popup />
          <q-btn label="Guardar" @click="onSubmit" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isEdit" >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Actualizar estudiante</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form class="q-gutter-md">
            <q-input
              class="col-12"
              outlined
              v-model="formAsig.asignatura"
              label="asignature *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Ingresar dato']"
            />
            <q-input
              class="col-12"
              outlined
              v-model="formAsig.nota"
              label="Apellido *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Ingresar dato']"
            />
           
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Cancelar" @click="onReset" color="negative" v-close-popup />
          <q-btn label="Actualizar" @click="onUpdate" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import {ref, onMounted } from 'vue';
import  type { frontface } from 'src/Interfaces/ExamInter';
import { type QTableProps, useQuasar } from 'quasar';
import { ShowL,craeteS,deleteS,updateS} from 'src/service/examSer';





const listUsr = ref<frontface[]>([])
const $q = useQuasar()
const createS = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const columns: QTableProps['columns'] = [
  {
    name:'asignatura',
    required: true,
    label: 'asignatura',
    align: 'left',
    field: (row: frontface) => row.asignatura,
    sortable: true
  },

  {
    name: 'nota',
    required: true,
    label: 'nota',
    align: 'left',
    field: (row: frontface) => row.nota,
    sortable: true
  },

  {
    name: 'action',
    label: 'acciones',
    align: 'left',
    field: '',
  }
]

const formAsig = ref({
  id: <number | null> null,
  asignatura: <string | null> null,
  nota: <number | null> null,
  
})

onMounted (() => {
  listado()
}
)

function onSubmit(): void {
  $q.loading.show({
    message: 'Guardando información'
  })
  craeteS(formAsig.value as frontface).then((response) => {
    $q.notify({
      message: response.data.message,
      icon: 'info',
      color: 'positive',
      position: 'top'
    })
    listado()
    createS.value = false
    onReset()
  }).catch((err) => {
    $q.notify({
      message: err,
      icon: 'info',
      color: 'negative',
      position: 'top'
    })
  }).finally(() => $q.loading.hide())
}

function editUser(data: frontface): void {
  isEdit.value = true
  formAsig.value = {
    id: data.id as number,
    asignatura: data.asignatura,
    nota: data.nota,
    
  }
}

function onReset(): void {
  formAsig.value = {
    id: null,
    asignatura: null,
    nota: null,
    
  }
}

function onUpdate(): void {
  $q.loading.show({
    message: 'Actualizando información'
  })
  console.log('usuario ', formAsig.value.id)
  updateS(formAsig.value as frontface).then((response) => {
    $q.notify({
      message: response.data.message,
      icon: 'info',
      color: 'positive',
      position: 'top'
    })
    listado()
    isEdit.value = false
    onReset()
  }).catch((err) => {
    $q.notify({
      message: err,
      icon: 'info',
      color: 'negative',
      position: 'top'
    })
  }).finally(() => $q.loading.hide())
}

function onDelete(data: frontface): void {
  $q.loading.show({
    message: 'Eliminando información'
  })
  deleteS(data.id as number).then((response) => {
    $q.notify({
      message: response.data.message,
      icon: 'thumb_up_off_alt',
      color: 'positive',
      position: 'top'
    })
    listado()
    onReset()
  }).catch((err) => {
    $q.notify({
      message: err,
      icon: 'info',
      color: 'negative',
      position: 'top'
    })
  }).finally(() => $q.loading.hide())
}

function listado(): void{
  $q.loading.show({
    message: 'Cargando información....'
  })
  ShowL().then((response) =>{
    listUsr.value = response.data
  }).catch((err) => err).finally(() => $q.loading.hide())
}

function VievFormCreate(): void {
  createS.value = true
}
</script>

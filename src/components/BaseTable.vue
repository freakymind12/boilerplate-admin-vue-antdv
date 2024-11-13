<template>
  <a-card size="large">
    <template #title>
      <span class="header-big-font">{{ tableTitle }}</span>
    </template>
    <a-flex
      gap="small"
      style="margin-bottom: 1rem"
      justify="space-between"
      wrap="wrap"
    >
      <a-input
        v-model:value="search"
        placeholder="Search data here"
        style="width: max-content"
        size="small"
      >
        <template #prefix> <SearchOutlined /></template>
      </a-input>
      <a-flex gap="small" wrap="wrap">
        <a-button
          type="primary"
          size="small"
          style="background-color: #133e87"
          @click="exportTable('csv')"
          v-if="downloadMenu"
          ><template #icon><FileTextOutlined /></template>.csv</a-button
        >
        <a-button
          type="primary"
          size="small"
          style="background-color: #ae445a"
          @click="exportTable('txt')"
          v-if="downloadMenu"
          ><template #icon><FileTextOutlined /></template>.txt</a-button
        >
        <a-button
          type="primary"
          size="small"
          style="background-color: #7ed4ad"
          @click="exportTable('print')"
          v-if="downloadMenu"
          ><template #icon><PrinterOutlined /> </template>Print</a-button
        >
        <a-button
          type="primary"
          size="small"
          v-if="addMenu"
          @click="emits('add-item')"
        >
          <template #icon>
            <PlusCircleOutlined />
          </template>
          Add
        </a-button>
      </a-flex>
    </a-flex>
    <vue3-datatable
      ref="datatable"
      :rows="data"
      :columns="cols"
      :sortable="true"
      skin="bh-table-striped bh-table-hover bh-table-bordered bh-table-compact"
      :search="search"
      :pageSize="props.pageSize"
      :pageSizeOptions="[5, 10, 15, 30, 50, 100]"
      :showPageSize="props.showPageSize"
    >
      <template #actions="data" v-if="actionTable">
        <a-flex gap="small">
          <a-tag color="blue" @click="emits('edit-item', data.value)"
            ><EditOutlined /> EDIT</a-tag
          >
          <a-tag color="red" @click="emits('delete-item', data.value)"
            ><DeleteOutlined /> DELETE</a-tag
          >
        </a-flex>
      </template>
      <template #roles="data">
        <a-tag
          :color="
            data.value.roles == 'admin'
              ? 'green'
              : data.value.roles == 'staff'
                ? 'purple'
                : 'volcano'
          "
          >{{ data.value.roles.toUpperCase() }}</a-tag
        >
      </template>
    </vue3-datatable>
  </a-card>
</template>

<script setup>
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  PrinterOutlined,
  FileTextOutlined,
} from '@ant-design/icons-vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import { ref } from 'vue'

const props = defineProps({
  downloadMenu: {
    type: Boolean,
    default: false,
  },
  addMenu: {
    type: Boolean,
    default: false,
  },
  tableTitle: {
    type: String,
    default: 'Table Title',
  },
  cols: {
    type: Array,
    default: () => [
      { field: 'id', title: 'ID Data' },
      { field: 'date', title: 'Date' },
      { field: 'id_machine', title: 'Machine', sort: false },
      { field: 'actions', title: 'Actions', sort: false },
    ],
  },
  data: {
    type: Array,
    default: () => [
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 2,
        date: '2024-10-13',
        id_machine: 'P2',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 2,
        date: '2024-10-13',
        id_machine: 'P2',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 2,
        date: '2024-10-13',
        id_machine: 'P2',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 2,
        date: '2024-10-13',
        id_machine: 'P2',
      },
      {
        id: 1,
        date: '2024-10-12',
        id_machine: 'P1',
      },
      {
        id: 2,
        date: '2024-10-13',
        id_machine: 'P2',
      },
    ],
  },
  actionTable: {
    type: Boolean,
    default: false,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  showPageSize: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['add-item', 'edit-item', 'delete-item'])

const search = ref('')

const datatable = ref(null)

const exportTable = type => {
  let records = datatable.value.getSelectedRows()
  if (!records?.length) {
    records = props.data
  }
  const filename = 'Table Data'
  const totalData = records.length

  if (type === 'csv' || type === 'txt') {
    // CSV or TXT
    const coldelimiter = ','
    const linedelimiter = '\n'
    let result = props.cols
      .filter(d => !d.hide && d.field !== 'actions')
      .map(d => {
        return d.title
      })
      .join(coldelimiter)
    result += linedelimiter
    records.map(item => {
      props.cols
        .filter(d => !d.hide && d.field !== 'actions')
        .map((d, index) => {
          if (index > 0) {
            result += coldelimiter
          }
          const val = d.field
            .split('.')
            .reduce((acc, part) => acc && acc[part], item)
          result += val
        })
      result += linedelimiter
    })

    if (result === null) return

    if (type === 'csv') {
      const data =
        'data:application/csv;charset=utf-8,' + encodeURIComponent(result)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', filename + '.csv')
      link.click()
    }

    if (type === 'txt') {
      const data =
        'data:application/txt;charset=utf-8,' + encodeURIComponent(result)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', filename + '.txt')
      link.click()
    }
  } else if (type === 'print') {
    // PRINT
    let rowhtml = '<p>' + filename + '</p>'
    rowhtml +=
      '<span style="font-size:12px; margin-bottom:1rem;">Total Rows: ' +
      totalData +
      '</span>'
    rowhtml +=
      '<table style="width: 100%; " cellpadding="0" cellspacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> '
    props.cols
      .filter(d => !d.hide && d.field !== 'actions')
      .map(d => {
        rowhtml += '<th>' + d.title + '</th>'
      })
    rowhtml += '</tr></thead>'
    rowhtml += '<tbody>'

    records.map(item => {
      rowhtml += '<tr>'
      props.cols
        .filter(d => !d.hide && d.field !== 'actions')
        .map(d => {
          const val = d.field
            .split('.')
            .reduce((acc, part) => acc && acc[part], item)
          rowhtml += '<td>' + val + '</td>'
        })
      rowhtml += '</tr>'
    })
    rowhtml +=
      '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>'
    rowhtml += '</tbody></table>'
    const winPrint = window.open(
      '',
      '',
      'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0',
    )
    winPrint.document.write('<title>' + filename + '</title>' + rowhtml)
    winPrint.document.close()
    winPrint.focus()
    winPrint.onafterprint = () => {
      winPrint.close()
    }
    winPrint.print()
  }
}
</script>

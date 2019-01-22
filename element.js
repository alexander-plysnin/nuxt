import Vue from 'vue'
//import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Progress,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  RadioButton,
  RadioGroup,
  Radio,
  Dialog,
  Option,
  Select,
  Form,
  DatePicker,
  Menu,
  MenuItem,
  ButtonGroup,
  Input,
  Button,
  Col,
  Row,
  Table,
  TableColumn
} from 'element-ui';

export default () => {
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Progress);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.use(Form);
Vue.component(DatePicker.name,DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(CheckboxButton);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
}

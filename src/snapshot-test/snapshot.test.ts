import { mount } from '@vue/test-utils';
import Nav from './Nav.vue';

it('should generate Nav.vue snapshot', () => {
  const wrapper = mount(Nav, {
    props: {
      title: '1234',
    },
  });
  // 生成快照
  expect(wrapper.html()).toMatchSnapshot();

  // 更新快照方式
  // 1. watch模式下，终端输入u即可
  // 2. 非watch模式，在命令后面添加 --update 参数即可
});

it('should generate Nav.vue inline snapshot', () => {
  const wrapper = mount(Nav, {
    props: {
      title: '1234',
    },
  });
  // 生成行内快照
  expect(wrapper.html()).toMatchInlineSnapshot(`"<div>1234</div>"`);
});

it('should generate Nav.vue snapshot html file', () => {
  const wrapper = mount(Nav, {
    props: {
      title: '1234',
    },
  });
  // 生成快照到Nav.html文件
  expect(wrapper.html()).toMatchFileSnapshot('./Nav.html');
})

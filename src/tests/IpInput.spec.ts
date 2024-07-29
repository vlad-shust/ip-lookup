import { mount } from '@vue/test-utils';
import moment from 'moment-timezone';
import IpInput from '@/components/IpInput.vue';

describe('IpInput.vue', () => {
  it('renders the component with props', () => {
    const wrapper = mount(IpInput, {
      props: {
        label: 1,
        value: '192.168.0.1',
        isLoading: false,
        errorMessage: '',
        placeholder: 'Enter IP',
        countryCode: '',
        timezone: ''
      }
    });

    expect(wrapper.find('input').element.value).toBe('192.168.0.1');
  });

  it('emits update:value on input change', async () => {
    const wrapper = mount(IpInput, {
      props: {
        label: 1,
        value: '192.168.0.1',
        isLoading: false,
        errorMessage: '',
        placeholder: 'Enter IP',
        countryCode: '',
        timezone: ''
      }
    });

    const input = wrapper.find('input');
    await input.setValue('192.168.1.1');

    expect(wrapper.emitted()['update:value'][0]).toEqual(['192.168.1.1']);
  });

  it('displays an error message', async () => {
    const wrapper = mount(IpInput, {
      props: {
        label: 1,
        value: '192.168.0.1',
        isLoading: false,
        errorMessage: 'Invalid IP address',
        placeholder: 'Enter IP',
        countryCode: '',
        timezone: ''
      }
    });

    expect(wrapper.find('.text-red-500').text()).toBe('Invalid IP address');
  });
});

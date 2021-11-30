import { shallowMount } from '@vue/test-utils'
import StructureUpload from '@/components/StructureUpload'

describe('StructureUpload', () => {
  it('disables submit if files are invalid', async () => {
    const wrapper = shallowMount(StructureUpload)
    await wrapper.setData({ formError: 'test error' })
    const divs = wrapper.findAll('div')
    // error div has appeared
    expect(divs.length).toEqual(3)
    // is displaying the test error
    expect(divs[0].text()).toEqual('test error')
  })

  it('disables submit if a submission error occurred', () => {
    const wrapper = shallowMount(StructureUpload, {
      props: { submitError: 'test error' }
    })
    const divs = wrapper.findAll('div')
    // error div has appeared
    expect(divs.length).toEqual(3)
    // is displaying the test error
    expect(divs[0].text()).toEqual('test error')
  })

  it('disables submit if currently polling', () => {
    const wrapper = shallowMount(StructureUpload, {
      props: { pollingServer: true }
    })
    const divs = wrapper.findAll('span')
    expect(divs.length).toEqual(2)
    expect(divs[0].classes()).toContain('spinner-grow')
    expect(divs[1].text()).toEqual('Loading...')
  })
})
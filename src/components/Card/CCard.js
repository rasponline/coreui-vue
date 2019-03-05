import { mergeData } from 'vue-functional-data-merge'
import sharedCardProps from './sharedCardProps'
import CCardHeader from './CCardHeader'
import CCardBody from './CCardBody'
import CCardFooter from './CCardFooter'

const props = Object.assign(
  sharedCardProps.props,
  {
    header: String,
    body: String,
    footer: String,
    bodyWrapper: Boolean
  }
)
export default {
  functional: true,
  name: 'CCard',
  props,
  render (h, { props, data, slots }) {
    let header = h(false)
    let body = slots().default
    let footer = h(false)

    if (props.header)
      header = h(CCardHeader, { domProps: { innerHTML: props.header }})

    if (body === undefined && props.body)
      body = h(CCardBody, { domProps: { innerHTML: props.body }})
    else if (props.bodyWrapper)
      body = h(CCardBody, body)


    if (props.footer)
      footer = h(CCardFooter, { domProps: { innerHTML: props.footer }})

    return h(
      props.tag || 'div',
      mergeData(data, {
        staticClass: 'card',
        class: {
          [`text-${props.align}`]: Boolean(props.align),
          [`bg-${props.variant}`]: Boolean(props.variant),
          [`border-${props.borderVariant}`]: Boolean(props.borderVariant),
          [`text-${props.textVariant}`]: Boolean(props.textVariant)
        }
      }),
      [ header, body, footer ]
    )
  }
}

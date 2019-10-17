import * as React from 'react'

interface Props {
  current: string
  collection: string[]
  onChange: (event) => void
}

const Select: React.FC<Props> = ({ current, collection, onChange }: Props) => {
  return (
    <select
      className="select-menu__button"
      onChange={event => {
        onChange(event)
      }}
    >
      {collection.map((item, index) => {
        return item == current ? (
          <option selected value={item} key={index}>
            {item}
          </option>
        ) : (
          <option value={item} key={index}>
            {item}
          </option>
        )
      })}
    </select>
  )
}

export default Select

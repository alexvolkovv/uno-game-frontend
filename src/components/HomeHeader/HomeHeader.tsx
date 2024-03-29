import React, { ChangeEvent, useState } from 'react'
import styles from './HomeHeader.module.scss'
import { Button, ButtonTypes } from '../UI/Button/Button'
import { getRooms } from '../../store/reducers/rooms/actionCreators'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Input } from '../UI/Input/Input'
import { useDebounce } from '../../hooks/useDebounce'

export const HomeHeader = () => {
  const { isLoading } = useAppSelector((state) => state.roomsReducer)
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce((searchQuery: string) => {
    dispatch(getRooms(searchQuery))
  }, 300)

  const changeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    debouncedSearch(event.target.value)
  }

  const updateRooms = () => {
    dispatch(getRooms(searchValue))
  }

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h2>Список комнат</h2>
        <Button
          btnType={ButtonTypes.white}
          onClick={updateRooms}
          disabled={isLoading}
        >
          Обновить
        </Button>
      </div>
      <Input
        placeholder={'Поиск команты...'}
        value={searchValue}
        onChange={changeSearchValue}
      />
    </header>
  )
}

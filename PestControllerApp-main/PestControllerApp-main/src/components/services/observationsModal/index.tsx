import Input from '@/components/input'
import { ButtonUI, IconButtonUI, ModalUI } from '../../../../packages/components'
import { ObservationsModalProps } from '../types'
import { ChangeEvent, useState } from 'react'
import { AddPhotoIcon, PlusIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'
import Image from 'next/image'
// import { convertFileToBase64 } from '@/libs/images'

const ObservationsModal: React.FC<ObservationsModalProps> = ({
  title,
  visible,
  onClose,
  setObsFinal,
}) => {
  const [observations, setObservations] = useState([])
  const [obsCount, setObsCount] = useState(40)

  const handleOnChange = (ev: ChangeEvent<HTMLInputElement>, index: number) => {
    const tempObs = [...observations]
    const findIndex = tempObs.findIndex(obs => obs?.index === index)

    if (ev.target.name === 'image') {
      if (findIndex) {
        tempObs[index] = {
          ...tempObs[index],
          [ev.target.name]: {
            file: ev.target.files[0],
            blob: URL.createObjectURL(ev.target.files[0]),
          },
        }
        setObservations([...tempObs])
      } else {
        const newObs = {
          [ev.target.name]: {
            file: ev.target.files[0],
            blob: URL.createObjectURL(ev.target.files[0]),
          },
        }

        setObservations(prevState => [...prevState, newObs])
      }
    } else {
      if (findIndex) {
        tempObs[index] = {
          ...tempObs[index],
          [ev.target.name]: ev.target.value,
        }
        setObservations([...tempObs])
      } else {
        const newObs = {
          [ev.target.name]: ev.target.value,
        }

        setObservations(prevState => [...prevState, newObs])
      }
    }
  }

  const handleIncreaseObsCount = () => setObsCount(prevState => prevState + 1)

  const saveObservations = () => {
    const savedObs = observations.filter(obs => obs?.ec)
    setObsFinal(savedObs)
    onClose()
  }

  return (
    <ModalUI title={title} visible={visible} onClose={saveObservations}>
      <div className="min-h-[70vh] p-2">
        <div className="flex flex-wrap gap-x-5 gap-y-1 h-full w-full lg:w-[50vw] justify-between items-stretch">
          <div className="flex basis-full gap-x-1 font-semibold">
            <span className="basis-11">N˚ EC</span>
            <span className="basis-14">N˚ OBS</span>
            <span className="flex-1">Detail</span>
          </div>
          {[...Array(obsCount)].map((_, i) => (
            <div key={i} className="flex basis-full lg:basis-[45%] gap-x-1">
              <span className="basis-11">
                <Input
                  border="outlined"
                  inputType="number"
                  name="ec"
                  value={observations[i]?.ec}
                  onChange={ev => handleOnChange(ev, i)}
                />
              </span>
              <span className="basis-14">
                <Input
                  border="outlined"
                  inputType="number"
                  name="obs"
                  value={observations[i]?.obs}
                  onChange={ev => handleOnChange(ev, i)}
                />
              </span>
              <span className="flex-1">
                <Input
                  border="underlined"
                  width="w-full"
                  name="detail"
                  value={observations[i]?.detail}
                  onChange={ev => handleOnChange(ev, i)}
                />
              </span>
              <span className="flex items-end relative">
                {observations[i]?.image ? (
                  <div className="flex w-8 h-8">
                    <Image
                      src={observations[i].image.blob}
                      alt="image"
                      layout="fill"
                      objectFit="center"
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <i>
                      <AddPhotoIcon width="20" height="20" fill={colors.gray.DEFAULT} />
                    </i>
                    <input type="file" name="image" onChange={ev => handleOnChange(ev, i)} />
                  </>
                )}
              </span>
            </div>
          ))}
          <IconButtonUI
            icon={<PlusIcon width="24px" height="24px" fill={colors.primary.DEFAULT} />}
            onClick={() => handleIncreaseObsCount()}
          />
        </div>
        <div className="flex justify-center">
          <ButtonUI text="Guardar" type="button" onClick={() => saveObservations()} />
        </div>
      </div>
    </ModalUI>
  )
}

export default ObservationsModal

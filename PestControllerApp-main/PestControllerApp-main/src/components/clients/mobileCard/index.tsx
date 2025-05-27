import { Client } from '@/api/client/type'

export type ClientCardProps = {
  clients: Client[]
  handleToClientDetail: (clientId: string) => void
}

const ClientCard: React.FC<ClientCardProps> = ({ clients, handleToClientDetail }) => {
  return (
    <>
      {clients?.map(client => (
        <div
          key={client._id}
          className="flex flex-col bg-white p-2 rounded-md border border-primary border-solid mb-2"
        >
          <span className="text-lg font-semibold">{client.businessName}</span>
          <span>RUT: {client.rut}</span>
          <span>Correo: {client.email}</span>
          <span>{client.address}</span>
          <div className="flex mt-1">
            <button
              className="border-[1px] border-primary rounded-lg px-2 py-1 text-primary"
              onClick={() => handleToClientDetail(client._id)}
            >
              Ver detalle
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default ClientCard

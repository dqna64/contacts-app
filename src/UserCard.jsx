

function UserCard({data}) {
    return <div className="border">
        <h2 className="text-xl lg:text-2xl font-bold leading-5 lg:leading-6">{data.name + " "}<span className="block lg:inline text-sm lg:text-base text-gray-500 font-medium">{"@" + data.username}</span></h2>
        <div className="mt-1 text-xs lg:text-sm">
            <p>{data.email}</p>
            <p>{data.website}</p>
            <p>{data.phone}</p>

        </div>
        <div className="mt-2 text-xs lg:text-sm">
            <p>{`${data.address.suite} ${data.address.street}, ${data.address.city} ${data.address.zipcode}`}</p>

        </div>
        <div className="mt-2 text-xs lg:text-sm">
            <h3 className="text-lg lg:text-xl">{data.company.name}</h3>
            <p>{data.company.catchPhrase}</p>
            <p>{data.company.bs}</p>

        </div>
    </div>
}

export default UserCard
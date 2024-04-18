export default function SupplierManagementManagePage() {
    return <div>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Supplier ID
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Supplier Name
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Phone Number
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Email
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Address
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">PetCo</td>
                    <td className="px-6 py-4 whitespace-nowrap">800-555-1234</td>
                    <td className="px-6 py-4 whitespace-nowrap">info@petco.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">123 Main St, Cityville</td>
                    <td className="px-6 py-4 whitespace-nowrap">Dog Collar</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryAccent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Add
                        </button>
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                            Cancel
                        </button>
                    </td>
                </tr>

                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2</td>
                    <td className="px-6 py-4 whitespace-nowrap">Paws &amp; Claws</td>
                    <td className="px-6 py-4 whitespace-nowrap">800-987-6543</td>
                    <td className="px-6 py-4 whitespace-nowrap">info@pawsclaws.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">321 Cedar St, Forestville</td>
                    <td className="px-6 py-4 whitespace-nowrap">Dog Bark</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryAccent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Add
                        </button>
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                            Cancel
                        </button>
                    </td>
                </tr>

                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">3</td>
                    <td className="px-6 py-4 whitespace-nowrap">Paws &amp; Claws</td>
                    <td className="px-6 py-4 whitespace-nowrap">800-987-6543</td>
                    <td className="px-6 py-4 whitespace-nowrap">info@pawsclaws.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">321 Cedar St, Forestville</td>
                    <td className="px-6 py-4 whitespace-nowrap">Cat Collar</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryAccent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Add
                        </button>
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                        >
                            Cancel
                        </button>
                    </td>
                </tr>

                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">4</td>
                    <td className="px-6 py-4 whitespace-nowrap">Happy Tails</td>
                    <td className="px-6 py-4 whitespace-nowrap">800-123-4567</td>
                    <td className="px-6 py-4 whitespace-nowrap">info@happytails.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">567 Maple Ave, Sunnytown</td>
                    <td className="px-6 py-4 whitespace-nowrap">Meaow Fary</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryAccent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Add
                        </button>
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                        >
                            Cancel
                        </button>
                    </td>
                </tr>


            </tbody>
        </table>
    </div>;
}
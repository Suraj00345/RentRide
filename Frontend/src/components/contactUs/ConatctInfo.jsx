import { MapPin, Mail, Phone, Clock } from "lucide-react";

const InfoItem = ({ icon: Icon, title, content }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md shadow-orange-100">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">
        {title}
      </p>
      <p className="text-sm font-black text-gray-800 leading-tight">
        {content}
      </p>
    </div>
  </div>
);

const ContactInfo = () => {
  return (
    <section className="max-w-screen mx-15 px-6 py-10 border-t border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <InfoItem
          icon={MapPin}
          title="Address"
          content="Oxford Ave. Cary, NC 27511"
        />
        <InfoItem icon={Mail} title="Email" content="nwiger@yahoo.com" />
        <InfoItem icon={Phone} title="Phone" content="+537 547-6401" />
        <InfoItem
          icon={Clock}
          title="Opening hours"
          content="Sun-Mon: 10am - 10pm"
        />
      </div>
    </section>
  );
};

export default ContactInfo;

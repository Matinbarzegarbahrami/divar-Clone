import { USERDASHBOARD } from "@/statics/userdashboard";


export default function MainDashboard({setPanel, panel}:{setPanel:(item:string)=>void, panel:string}){
    return(
    <>
        {USERDASHBOARD.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.url}
                onClick={() => setPanel(item.url)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-right transition-all
                  ${
                    panel === item.url
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "hover:bg-zinc-900 text-zinc-300"
                  }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            );
          })}
          </>
    )
}
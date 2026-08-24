"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function ProfileForm({initialName}:{initialName:string}){const [name,setName]=useState(initialName);const [loading,setLoading]=useState(false);const [message,setMessage]=useState("");const router=useRouter();async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setMessage("");const result=await authClient.updateUser({name});setLoading(false);if(result.error)setMessage(result.error.message??"No fue posible actualizar");else{setMessage("Nombre actualizado");router.refresh();}}return <form onSubmit={submit} className="app-card p-6"><h2 className="font-semibold">Perfil</h2><div className="mt-4"><label className="label" htmlFor="profile-name">Nombre</label><input id="profile-name" className="field" value={name} onChange={e=>setName(e.target.value)} minLength={2} maxLength={80}/></div>{message?<p className="mt-3 text-sm text-muted">{message}</p>:null}<button className="primary-button mt-5 w-fit" disabled={loading}>{loading?<Loader2 size={16} className="animate-spin"/>:<Save size={16}/>} Guardar</button></form>}

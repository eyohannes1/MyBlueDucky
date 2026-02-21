
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash2, User } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function AboutStep() {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "teamMembers"
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">About Us & Team</h2>
                <p className="text-indigo-200/70">Tell your story and introduce the people behind the brand.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="companyStory">Company Story / Mission</Label>
                    <Textarea
                        id="companyStory"
                        {...register("companyStory")}
                        placeholder="Founded in 2024 with a mission to..."
                        className="bg-white/5 border-white/10 focus:border-purple-500 min-h-[120px] transition-all resize-none"
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
                    <User className="h-4 w-4" /> Team Members
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                    {fields.map((field, index) => (
                        <div key={field.id} className="relative p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-purple-500/30 transition-all duration-300 group">

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-950/30"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                                        <User className="h-8 w-8 text-white/50" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Input {...register(`teamMembers.${index}.name`)} placeholder="Full Name" className="bg-black/20 border-white/10 focus:border-purple-500 h-9" />
                                        <Input {...register(`teamMembers.${index}.role`)} placeholder="Job Title" className="bg-black/20 border-white/10 focus:border-purple-500 h-9" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Input {...register(`teamMembers.${index}.bio`)} placeholder="Short bio..." className="bg-black/20 border-white/10 focus:border-purple-500 text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Input {...register(`teamMembers.${index}.photoUrl`)} placeholder="Photo URL (Optional)" className="bg-black/20 border-white/10 focus:border-purple-500 text-xs py-1 h-7" />
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => append({ name: "", role: "", bio: "", photoUrl: "" })}
                        className="h-full min-h-[200px] border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:border-purple-500 hover:text-purple-400 hover:bg-purple-950/20 rounded-2xl transition-all"
                    >
                        <Plus className="h-8 w-8" />
                        <span>Add Team Member</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

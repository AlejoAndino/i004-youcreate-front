import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

type LoginType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginType>();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<LoginType> = async data => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            console.log("Iniciando sesión con:", result);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-2xl border border-[#4d4d4d] shadow-lg w-[502px] h-[760px] overflow-hidden p-6">
                <div className="relative">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlbzQSwEkbwmAZ0yt9AKLOPbz_8mYlFM7bCg&s"
                        alt="Fondo"
                        className="w-[454px] h-[215px] object-cover rounded-lg"
                    />
                    <div
                        className="absolute bottom-0 left-0 transform translate-x-4 translate-y-14 w-[104px] h-[104px] bg-[#cccccc] rounded-[100px] border-4 border-[#fffcfc] flex items-center justify-center">
                        <span className="text-4xl text-gray-600">👤</span>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-center text-xl font-normal pl-[100px]">
                        Bienvenido de nuevo, <span className="font-bold">Matias!</span>
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Correo Electrónico es requerido",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Correo Electrónico no es válido"
                                    }
                                })}
                                placeholder="Correo Electrónico"
                                className="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:ring-gray-300 focus:border-gray-400"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "Contraseña es requerida",
                                    minLength: {
                                        value: 3,
                                        message: "La contraseña debe tener al menos 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "La contraseña debe tener menos de 20 caracteres"
                                    }
                                })}
                                placeholder="Contraseña *"
                                className="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:ring-gray-300 focus:border-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between text-sm mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register("rememberMe")}
                                    className="mr-2"
                                />
                                Recordarme
                            </label>
                            <a href="#" className="text-gray-500">
                                ¿Has olvidado la contraseña?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-800 text-white py-2 hover:bg-gray-900 transition text-base font-bold font-['Lato'] tracking-tight mt-4 rounded-lg shadow"
                        >
                            INICIAR SESIÓN
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="flex items-center justify-center space-x-2">
                            <hr className="w-1/3 border-gray-300"/>
                            <span className="text-sm text-gray-500">o continuar con</span>
                            <hr className="w-1/3 border-gray-300"/>
                        </div>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button className="w-12 h-12 p-2 bg-gray-200 aspect-square-full flex items-center justify-center">
                                <FaFacebook className="text-gray-600 text-lg"/>
                            </button>
                            <button className="w-12 h-12 p-2 bg-gray-200 aspect-square-full flex items-center justify-center">
                                <FaGoogle className="text-gray-600 text-lg"/>
                            </button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500 ml-10">
                        ¿No tenés una cuenta?{" "}
                        <Link to="/register" className="text-gray-800 underline font-medium">
                            Registrate acá
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
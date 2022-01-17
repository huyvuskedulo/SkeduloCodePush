//
//  AppDelegate.swift
//  SkeduloCodePush
//
//  Created by Huy Vu on 11/01/2022.
//

import UIKit
import React

@main
class AppDelegate: UIResponder, UIApplicationDelegate, RCTBridgeDelegate {
    
    static var bridge: RCTBridge!
    static var isDevelopmentOn: Bool = true
    static var shared:AppDelegate? = nil
    
    func reloadBridge() {
        AppDelegate.bridge = RCTBridge(delegate: self, launchOptions: nil)
    }
    
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        if AppDelegate.isDevelopmentOn {
            return URL(string: "http://localhost:8081/index.bundle?platform=ios")!
        } else {
            let url = FileManager.default.urls(for: .documentDirectory, in:.userDomainMask)[0].appendingPathComponent("mex/main.jsbundle", isDirectory: false)
            
            return url
        }
    }


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        AppDelegate.shared = self;
        AppDelegate.bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
        
        return true
    }

    
    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

